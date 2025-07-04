// import type { NextApiRequest, NextApiResponse } from "next"
// import formidable, { File, Fields, Files } from "formidable"
// import fs from "fs"
// import path from "path"

// // Disable Next.js default body parsing
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// // Ensure type-safe parse function
// function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
//   const uploadDir = path.join(process.cwd(), "/public/uploads")

//   // Ensure upload directory exists
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true })
//   }

//   const form = formidable({
//     uploadDir,
//     keepExtensions: true,
//     maxFileSize: 5 * 1024 * 1024,
//     filename: (_name, _ext, part) => {
//       const timestamp = Date.now()
//       const original = part.originalFilename?.replace(/\s+/g, "_") || "upload"
//       return `${timestamp}-${original}`
//     },
//   })

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err)
//       else resolve({ fields, files })
//     })
//   })
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" })
//   }

//   try {
//     const { files } = await parseForm(req)

//     const uploadedFile = files.file as File[] | File | undefined

//     // Handle file missing
//     if (!uploadedFile) {
//       return res.status(400).json({ message: "No file uploaded" })
//     }

//     // If multiple files were sent
//     const fileArray: File[] = Array.isArray(uploadedFile) ? uploadedFile : [uploadedFile]
//     const file = fileArray[0]

//     const fileName = path.basename(file.filepath)
//     const imageUrl = `/uploads/${fileName}`

//     return res.status(200).json({ imageUrl })
//   } catch (error) {
//     console.error("Upload error:", error)
//     return res.status(500).json({ message: "Upload failed", error: (error as Error).message })
//   }
// }

import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const chunks: Buffer[] = []

    req.on('data', chunk => chunks.push(chunk))
    req.on('end', async () => {
      const buffer = Buffer.concat(chunks)

      const boundary = req.headers['content-type']?.split('boundary=')?.[1]
      if (!boundary) return res.status(400).json({ error: 'Invalid form data' })

      const raw = buffer.toString()
      const match = raw.match(/filename="(.+)"/)
      if (!match) return res.status(400).json({ error: 'No file uploaded' })

      const filename = match[1]
      const extension = path.extname(filename)
      const fileName = `${uuidv4()}${extension}`
      const uploadPath = path.join(process.cwd(), 'public/uploads')

      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true })

      const fileStart = buffer.indexOf('\r\n\r\n') + 4
      const fileEnd = buffer.lastIndexOf(`--${boundary}--`) - 2
      const fileBuffer = buffer.slice(fileStart, fileEnd)

      fs.writeFileSync(path.join(uploadPath, fileName), fileBuffer)

      res.status(200).json({ url: `/uploads/${fileName}` })
    })
  } catch (err) {
    console.error('[UPLOAD_ERROR]', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
