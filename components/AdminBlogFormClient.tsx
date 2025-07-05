"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { ArrowLeft, ImagePlus, Trash2, Calendar, Clock, Tag, Loader2 } from "lucide-react"
import BlogEditor from '@/components/BlogEditor'
import ClientOnly from "@/components/ClientOnly"

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: string
  coverImage: string
  categories: string
}

export default function AdminBlogForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split('T')[0],
    readTime: "5",
    coverImage: "",
    categories: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug')
  const isEditing = Boolean(slug)

  useEffect(() => {
    if (!slug || typeof slug !== "string") return

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/get?slug=${slug}`)
        const data = await res.json()

        setFormData({
          ...data,
          categories: data.categories.join(", "),
          readTime: data.readTime.toString(),
        })
      } catch (err) {
        toast({
          title: "Failed to load blog",
          variant: "destructive",
        })
      }
    }

    fetchBlog()
  }, [slug, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file type", variant: "destructive" })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large (max 5MB)", variant: "destructive" })
      return
    }

    const form = new FormData()
    form.append("file", file)

    setUploading(true)
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")

      setFormData((prev) => ({ ...prev, coverImage: data.url }))
      toast({ title: "Image uploaded successfully!" })
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = []
    if (!formData.title) errors.push("Title is required")
    if (!formData.slug) errors.push("Slug is required")
    if (!formData.content) errors.push("Content is required")

    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      toast({
        title: "Invalid Slug",
        description: "Slug can only contain lowercase letters, numbers, and hyphens",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        categories: formData.categories
          .split(",")
          .map((cat) => cat.trim())
          .filter(Boolean),
        readTime: parseInt(formData.readTime) || 5,
        date: formData.date || new Date().toISOString(),
      }

      const apiPath = isEditing ? `/api/blog/update?slug=${formData.slug}` : "/api/blog/create"
      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(apiPath, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Failed to save blog post")
      }

      toast({
        title: isEditing ? "Updated!" : "Success!",
        description: isEditing
          ? "Blog post updated successfully"
          : "Blog post created successfully",
      })

      setTimeout(() => {
        router.push(`/blog/${formData.slug}`)
      }, 1500)
    } catch (err) {
      console.error("Submission error:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mt-10 mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isEditing ? "Update your existing content" : "Craft your next masterpiece"}
            </p>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || uploading}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                {isEditing ? "Update Post" : "Publish Post"}
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Your amazing blog title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="my-awesome-post"
              required
            />
            <p className="text-xs text-muted-foreground">
              Only lowercase letters, numbers, and hyphens
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            placeholder="A short preview of your post"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            This appears in blog listings and search results
          </p>
        </div>

        <div className="space-y-4">
          <Label>Featured Image</Label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="gap-2"
              >
                <ImagePlus className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                disabled={uploading || isSubmitting}
                className="hidden"
              />
              {formData.coverImage && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            
            {formData.coverImage && (
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border">
                <img
                  src={formData.coverImage}
                  alt="Featured preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content *</Label>
          <div className="rounded-lg border overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
            <ClientOnly>

              <BlogEditor 
                content={formData.content} 
                onChange={handleContentChange} 
              />
            </ClientOnly>
            </Suspense>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Publish Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="readTime">Reading Time (minutes) *</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="5"
                type="number"
                min="1"
                required
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categories">Categories</Label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              placeholder="technology, programming, web-development"
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Separate multiple categories with commas
          </p>
        </div>
      </form>
    </div>
  )
}