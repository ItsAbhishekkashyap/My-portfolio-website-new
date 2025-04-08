// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { messages } = req.body

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // 👈 API key from .env
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // ya gpt-4 agar use kar rahe ho
        messages: messages,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || '⚠️ No reply'

    res.status(200).json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: 'Error reaching the model 😢' })
  }
}
