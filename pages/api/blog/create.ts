// import type { NextApiRequest, NextApiResponse } from "next"
// import { dbConnect } from "@/lib/dbConnect"
// import { Blog } from "@/models/Blog"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await dbConnect()
//   } catch (error) {
//     console.error("DB Connection Error:", error)
//     return res.status(500).json({ message: "Failed to connect to database." })
//   }

//   if (req.method === "POST") {
//     try {
//       const { title, slug, excerpt, content, date, readTime, coverImage, categories } = req.body

//       // Validate required fields
//       if (!title || !slug || !excerpt || !content || !date || !readTime || !coverImage || !categories) {
//         return res.status(400).json({ message: "All fields are required." })
//       }

//       if (!Array.isArray(categories)) {
//         return res.status(400).json({ message: "Categories must be an array." })
//       }

//       // Check for duplicate slug
//       const existing = await Blog.findOne({ slug })
//       if (existing) {
//         return res.status(409).json({ message: "Slug already exists!" })
//       }

//       // Create blog
//       const newBlog = await Blog.create({
//         title,
//         slug,
//         excerpt,
//         content,
//         date,
//         readTime,
//         coverImage,
//         categories,
//         views: 0, // default value
//       })

//       return res.status(201).json({ message: "Blog created", blog: newBlog })
//     } catch (error) {
//       console.error("Create Blog Error:", error)
//       return res.status(500).json({ message: "Internal server error" })
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" })
//   }
// }



import type { NextApiRequest, NextApiResponse } from "next"
import { dbConnect } from "@/lib/dbConnect"
import { Blog } from "@/models/Blog"
import { BlogPostData } from "@/types/blog" // Define your types

interface ApiResponse {
  success: boolean
  message: string
  data?: {
    id: string
    slug: string
    title: string
  }
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Connect to database
  try {
    await dbConnect()
  } catch (error) {
    console.error("Database connection error:", error)
    return res.status(500).json({ 
      success: false,
      message: "Failed to connect to database",
      error: error instanceof Error ? error.message : "Unknown error"
    })
  }

  // Handle POST request
  if (req.method === "POST") {
    try {
      const { 
        title, 
        slug, 
        excerpt, 
        content, 
        date, 
        readTime, 
        coverImage, 
        categories 
      }: BlogPostData = req.body

      // Validate required fields
      if (!title || !slug || !content) {
        return res.status(400).json({
          success: false,
          message: "Title, slug, and content are required fields"
        })
      }

      // Validate slug format
      if (!/^[a-z0-9-]+$/.test(slug)) {
        return res.status(400).json({
          success: false,
          message: "Slug must be lowercase with hyphens only (no spaces or special chars)"
        })
      }

      // Convert categories to array with proper typing
      let categoriesArray: string[] = []
      if (typeof categories === "string") {
        categoriesArray = categories.split(",")
          .map((cat: string) => cat.trim())
          .filter((cat: string) => cat.length > 0)
      } else if (Array.isArray(categories)) {
        categoriesArray = categories.map((cat: any) => String(cat).trim())
          .filter((cat: string) => cat.length > 0)
      }

      // Check for existing blog with same slug
      const existingBlog = await Blog.findOne({ slug })
      if (existingBlog) {
        return res.status(409).json({
          success: false,
          message: "A blog with this slug already exists"
        })
      }

      // Create new blog post with proper typing
      const newBlog = await Blog.create({
        title,
        slug,
        excerpt: excerpt || "",
        content,
        date: date || new Date().toISOString(),
        readTime: parseInt(readTime as string) || 5,
        coverImage: coverImage || "",
        categories: categoriesArray,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return res.status(201).json({
        success: true,
        message: "Blog post created successfully",
        data: {
          id: newBlog._id.toString(),
          slug: newBlog.slug,
          title: newBlog.title
        }
      })

    } catch (error: unknown) {
      console.error("Blog creation error:", error)
      return res.status(500).json({
        success: false,
        message: "Failed to create blog post",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }

  // Handle other HTTP methods
  return res.status(405).json({
    success: false,
    message: "Method not allowed"
  })
}