'use client'

import dynamic from "next/dynamic"

// Dynamically load Chatbot with SSR disabled
const Chatbot = dynamic(() => import('./chatbot'), { ssr: false })

export default function ChatbotWrapper() {
  return <Chatbot />
}
