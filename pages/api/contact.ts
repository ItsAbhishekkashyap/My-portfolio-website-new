import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { dbConnect } from "@/lib/dbConnect";
import Contact from "@/models/Contact";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Email setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });
  
  await transporter.sendMail({
    from: `"${name}" <${process.env.GMAIL_USER}>`, // use your Gmail here
    to: "abhi47025@gmail.com", // where you'll receive it
    subject: `New Contact Message from ${name}: ${subject}`,
    text: `
  You received a new message from your portfolio contact form.
  
  Name: ${name}
  Email: ${email}
  Subject: ${subject}
  
  Message:
  ${message}
    `,
  });
  

  try {
    // 1. Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "abhi47025@gmail.com",
      subject,
      text: message,
    });

    // 2. Connect to MongoDB and save contact
    await dbConnect();

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return res.status(200).json({ message: "Email sent and data saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

