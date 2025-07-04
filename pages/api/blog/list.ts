// pages/api/blog/list.ts
import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from "mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const client = new MongoClient(process.env.MONGODB_URI!)
  try {
    await client.connect()
    const db = client.db()

    const blogs = await db
      .collection('blogs')
      .find({})
      .project({
        title: 1,
        slug: 1,
        date: 1,
        categories: 1,
        views: 1
      })
      .sort({ date: -1 })
      .toArray()

    return res.status(200).json({ blogs })
  } catch (err) {
    console.error('Failed to fetch blogs:', err)
    return res.status(500).json({ error: 'Failed to fetch blogs' })
  } finally {
    await client.close()
  }
}