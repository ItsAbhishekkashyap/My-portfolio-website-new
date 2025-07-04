
import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { parse } from "cookie"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.headers.cookie
  if (!cookie) return res.status(401).json({ role: "unauthorized" })

  const token = parse(cookie).token
  if (!token) return res.status(401).json({ role: "unauthorized" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    if (typeof decoded !== "string" && decoded.role === "admin") {
      return res.status(200).json({ role: "admin" })
    } else {
      return res.status(403).json({ role: "user" })
    }
  } catch {
    return res.status(401).json({ role: "unauthorized" })
  }
}
