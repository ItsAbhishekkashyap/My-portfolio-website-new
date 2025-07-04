import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/lib/dbConnect'
import { Blog } from '@/models/Blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const { slug } = req.query

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } }, // 👀 Increment views
        { new: true }
      )

      if (!blog) return res.status(404).json({ message: 'Blog not found' })

      return res.status(200).json({ blog })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
