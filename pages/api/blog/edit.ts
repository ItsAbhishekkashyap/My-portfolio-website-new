// import type { NextApiRequest, NextApiResponse } from "next";
// import { dbConnect } from "@/lib/dbConnect";
// import { Blog } from "@/models/Blog";
// import { BlogPostData } from "@/types/blog";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "PUT") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   try {
//     await dbConnect();

//     const { slug } = req.query;
//     if (!slug || typeof slug !== "string") {
//       return res.status(400).json({ success: false, message: "Missing slug in query" });
//     }

//     const {
//       title,
//       excerpt,
//       content,
//       date,
//       readTime,
//       coverImage,
//       categories,
//     }: BlogPostData = req.body;

//     const updated = await Blog.findOneAndUpdate(
//       { slug },
//       {
//         title,
//         excerpt,
//         content,
//         date,
//         readTime,
//         coverImage,
//         categories,
//         updatedAt: new Date(),
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Blog not found" });
//     }

//     return res.status(200).json({ success: true, message: "Blog updated successfully" });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: "Failed to update blog" });
//   }
// }

// pages/api/blog/edit.ts
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug } = req.query;
  const { title, excerpt, content, coverImage } = req.body;

  if (!slug) {
    return res.status(400).json({ error: "Slug parameter is required" });
  }

  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();

    const result = await client
      .db()
      .collection("blogs")
      .updateOne(
        { slug },
        { $set: { 
          title,
          excerpt,
          content,
          coverImage,
          updatedAt: new Date() 
        }}
      );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Blog not found or no changes made" });
    }

    return res.status(200).json({ success: true, message: "Blog updated successfully" });
  } catch (err) {
    console.error("Error updating blog:", err);
    return res.status(500).json({ error: "Failed to update blog" });
  } finally {
    await client.close();
  }
}