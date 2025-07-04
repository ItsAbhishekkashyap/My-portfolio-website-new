import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/dbConnect";
import { Blog } from "@/models/Blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { slug } = req.query;
    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }

    const deleted = await Blog.findOneAndDelete({ slug });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
}
