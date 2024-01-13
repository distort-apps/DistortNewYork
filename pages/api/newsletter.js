import nodemailer from 'nodemailer';
import { connectDatabase, insertDocument } from '../../helpers/db-util'
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
    subject: ' Ⓐ DSNY Newsletter Subscription Confirmation Ⓐ',
    text: 'Thank you for subscribing to the DistortNewYork newsletter Ⓐ.'
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

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed.' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });

      try {
        await sendConfirmationEmail(userEmail);
        console.log('Sending confirmation email');
        res.status(201).json({ message: 'Signed up successfully! Confirmation email sent.' });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        res.status(500).json({ message: 'Signing up succeeded, but sending confirmation email failed.' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
    } finally {
      client.close();
    }
  }
}

export default handler;
