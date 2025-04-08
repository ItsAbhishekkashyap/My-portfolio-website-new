'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { X, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fullChatContext } from '@/lib/chatContext'

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            role: 'system',
            content: `You're a personal assistant of Abhishek Gond. Here is some information you know:\n${fullChatContext}`
        }
    ])
    const [loading, setLoading] = useState(false)
    const [chat, setChat] = useState<string[]>([
        `🤖 GPT: 👋 Hey! I’m Abhishek’s AI assistant. Ask me anything about his work, projects, or contact info!`
    ])

    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedChat = localStorage.getItem("chat")
        if (savedChat) {
            setChat(JSON.parse(savedChat))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("chat", JSON.stringify(chat))
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chat])

    async function sendMessage() {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setChat(prev => [...prev, `🧑‍💻 You: ${input}`])
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            })

            const data = await res.json()
            console.log("🧠 Response from API:", data)

            if (data && data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
                setChat(prev => [...prev, `🤖 GPT: ${data.reply}`])
            } else {
                setChat(prev => [...prev, `🤖 GPT: (No reply received)`])
            }
        } catch (err) {
            console.error("Error calling API:", err)
            setChat(prev => [...prev, `🤖 GPT: (Error fetching reply)`])
        }

        setLoading(false)
    }

    return (
        <div>
            {/* Floating Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-14 right-5 z-50 w-8.5 h-8.5 p-2 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
            >
                {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
            </Button>




            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-24 right-4 max-w-sm w-[90vw] sm:w-96 p-4 shadow-2xl rounded-2xl bg-white dark:bg-black z-50 transition-all animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto text-sm pr-2">
                        {chat.map((msg, i) => {
                            const isUser = msg.startsWith("🧑‍💻")
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        'p-2 rounded-xl max-w-[80%] mb-1',
                                        isUser
                                            ? 'bg-blue-500 text-white ml-auto text-right'
                                            : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white'
                                    )}
                                >
                                    {msg}
                                </div>
                            )
                        })}

                        {loading && (
                            <div className="text-gray-400 text-sm animate-pulse">🤖 GPT is typing...</div>
                        )}

                        <div ref={endRef} />
                    </div>

                    <div className="flex mt-3 space-x-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="rounded-xl"
                        />
                        <Button onClick={sendMessage} disabled={loading} className="rounded-xl">
                            {loading ? '...' : 'Send'}
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}

