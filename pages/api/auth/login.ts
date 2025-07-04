// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next"
import { Admin } from "@/models/Admin"
import { dbConnect } from "@/lib/dbConnect"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" })

  await dbConnect()

  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(401).json({ message: "Invalid credentials" })

  const isMatch = await admin.comparePassword(password)
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: admin._id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )

  res.setHeader("Set-Cookie", serialize("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  }))

  res.status(200).json({ message: "Logged in successfully" })
}
