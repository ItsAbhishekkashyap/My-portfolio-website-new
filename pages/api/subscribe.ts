// /pages/api/subscribe.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your gmail (from .env.local)
        pass: process.env.GMAIL_PASS, // your app password
      },
    });

    await transporter.sendMail({
      from: `"Abhishek's Dev Dojo 🥋" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: 'New Dev Dojo Subscriber!',
      text: `New email subscriber: ${email}`,
      html: `<p><strong>New email subscriber:</strong> ${email}</p>`,
    });

    return res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
