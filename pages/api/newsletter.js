import nodemailer from 'nodemailer';
import Newsletter from '@/models/newsletter-model';

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
    subject: 'DistorNewYork Newsletter Subscription Confirmation',
    text: 'Thank you for subscribing to the DistortNewYork newsletter. \n Ⓐ ☮︎ Ⓔ'
  };

  await transporter.sendMail(mailOptions);
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      // Create a new document in the Newsletter collection
      const newSubscriber = new Newsletter({ email: userEmail });
      await newSubscriber.save();

      // Send confirmation email
      try {
        await sendConfirmationEmail(userEmail);
        res.status(201).json({ message: 'Signed up successfully! Confirmation email sent.' });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        res.status(500).json({ message: 'Signing up succeeded, but sending confirmation email failed.' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
    }
  }
}

export default handler;
