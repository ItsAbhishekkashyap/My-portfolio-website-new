// data/blogs.ts

export interface BlogPost {
  id: number
  slug: string    // add slug here
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  views: number
  categories: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-i-built-branqly",
    title: "How I Built Branqly – A Modern SaaS Link Shortener",
    excerpt:
      "A breakdown of how I built and scaled Branqly with custom domain mapping, analytics, and auth flow.",
      content: `
    <h2>Introduction</h2>
    <p>Branqly is a modern URL shortener...</p>
    <h3>Features</h3>
    <ul>
      <li>Custom domain mapping</li>
      <li>Analytics dashboard</li>
      <li>Auth flow with JWT</li>
    </ul>
    <p>...</p>
  `,
    coverImage: "/blog/branqly.png",
    date: "July 2, 2025",
    readTime: "6 min read",
    views: 1856,
    categories: ["Web Dev", "SaaS"],
    featured: true,
  },
  {
    id: 2,
    slug: "dev-by-day-kick-by-night",
    title: "Dev by Night, Kick by Day – My Routine 🥋",
    excerpt:
      "How I manage full-stack dev learning, college, and martial arts — balancing body and mind.",
      content: `
    <h2>Introduction</h2>
    
  `,
    coverImage: "/blog/codefight.png",
    date: "June 27, 2025",
    readTime: "5 min read",
    views: 1023,
    categories: ["Lifestyle", "Discipline"],
  },
  {
    id: 3,
    slug: "vercel-ai-sdk-chatbot",
    title: "Vercel AI SDK Chatbot for Portfolios",
    excerpt:
      "Guide to integrate a smart chatbot in your portfolio using Vercel’s AI SDK with minimal code.",
      content: `
    <h2>Introduction</h2>
    
  `,
    coverImage: "/blog/chatbot.png",
    date: "June 19, 2025",
    readTime: "7 min read",
    views: 1443,
    categories: ["AI", "Next.js"],
  },

]
