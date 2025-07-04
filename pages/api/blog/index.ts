// /pages/api/blog/index.ts
import { dbConnect } from "@/lib/dbConnect"
import { Blog } from "@/models/Blog"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  if (req.method === "GET") {
    try {
      const {
        page = "1",
        limit = "4",
        search = "",
        tag = "",
      } = req.query

      const currentPage = parseInt(page as string, 10)
      const perPage = parseInt(limit as string, 10)

      const skip = (currentPage - 1) * perPage

      const query: any = {}

      // 🔍 Search keyword in title, excerpt, or category
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { excerpt: { $regex: search, $options: "i" } },
          { categories: { $regex: search, $options: "i" } },
        ]
      }

      // 🏷️ Filter by tag/category
      if (tag) {
        query.categories = tag
      }

      const totalBlogs = await Blog.countDocuments(query)

      const blogs = await Blog.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(perPage)

      const totalPages = Math.ceil(totalBlogs / perPage)

      return res.status(200).json({ blogs, totalPages })
    } catch (error) {
      console.error("Error in blog query:", error)
      return res.status(500).json({ message: "Error fetching blogs" })
    }
  }

  res.status(405).json({ message: "Method not allowed" })
}


