import { NextApiRequest, NextApiResponse } from "next"
import { Blog } from "@/models/Blog"
import { dbConnect } from "@/lib/dbConnect"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { slug } = req.query

  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ message: "Invalid slug" })
  }

  const blog = await Blog.findOne({ slug })
  if (!blog) return res.status(404).json({ message: "Blog not found" })

  res.status(200).json(blog)
}
