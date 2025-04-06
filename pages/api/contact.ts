import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Missing fields" })
  }

  // Set up your transporter using Gmail or another SMTP service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhi47025@gmail.com", 
      pass: "jxvq jwtr rttf bceh",   
    },
  })

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "abhi47025@gmail.com", 
      subject,
      text: message,
    })

    return res.status(200).json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
