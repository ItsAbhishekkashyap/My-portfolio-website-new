// types/blog.ts
export interface BlogPostData {
  title: string
  slug: string
  excerpt?: string
  content: string
  date?: string
  readTime?: string | number
  coverImage?: string
  categories?: string | string[]
}

export interface BlogPostResponse {
  success: boolean
  message: string
  data?: {
    id: string
    slug: string
    title: string
  }
  error?: string
}