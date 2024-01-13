import { connectDatabase, insertDocument } from '@/helpers/db-util';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multer from 'multer';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const areAllFieldsEmpty = req => {
  const formData = req.body;
  return !formData.email && !formData.title && !formData.date && 
         !formData.genre && !formData.time && !formData.price && 
         !formData.excerpt && !req.file;
};

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

async function uploadToS3(file, filename) {
  const s3Path = `shows/${filename}`;
  try {
    const params = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
      Key: s3Path,
      Body: file,
      ContentType: "image/jpg, image/png, image/jpeg"
    };

    await s3Client.send(new PutObjectCommand(params));
    return `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Path}`;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}

async function sendConfirmationEmail(userEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: 'contact@distort-new-york.com', 
    to: userEmail,
    subject: 'Ⓐ DSNY Event Submission Confirmation Ⓐ',
    text: 'Thank you for submitting your event. We will contact you as soon as it is posted.'
  };

  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return res.status(500).json({ message: 'Connecting to the database failed' });
  }

  if (req.method === 'POST') {
    
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).json({ error: 'File upload error' });
      } else if (err) {
        console.error('Unknown error:', err);
        return res.status(500).json({ error: 'Unknown error occurred' });
      }

      if (areAllFieldsEmpty(req)) {
        return res.status(400).json({ error: 'Please fill in at least one field.' });
      }
      
      const file = req.file;
      let imageUrl = null;

      if (file) {
        try {
          imageUrl = await uploadToS3(file.buffer, file.originalname);
        } catch (error) {
          console.error('Failed to upload image to S3:', error);
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      }

      const formData = {
        email: req.body.email,
        title: req.body.title,
        date: req.body.date,
        genre: req.body.genre,
        time: req.body.time,
        price: req.body.price,
        excerpt: req.body.excerpt,
        imageUrl: imageUrl
      };

      try {
        await insertDocument(client, 'contact', formData);
        
        if (req.body.email) {
          try {
            await sendConfirmationEmail(req.body.email);
            res.status(201).json({ message: 'Event submitted and email sent successfully!' });
          } catch (emailError) {
            console.error('Error sending email:', emailError);
            res.status(500).json({ message: 'Event submitted but email sending failed' });
            return;
          }
        } else {
          res.status(201).json({ message: 'Event submitted successfully!' });
        }

      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).json({ error: 'Failed to insert data' });
      } finally {
        client.close();
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



