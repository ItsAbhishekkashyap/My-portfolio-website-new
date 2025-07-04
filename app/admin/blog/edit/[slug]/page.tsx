// "use client"

// import { useState, useEffect } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import toast from "react-hot-toast"

// interface Blog {
//   _id: string
//   title: string
//   slug: string
//   excerpt: string
//   content: string
//   coverImage: string
//   categories: string[]
//   date: string
//   readTime: string
//   views: number
// }

// export default function EditBlogPage() {
//   const router = useRouter()
//   const params = useParams()

//   // Handle null params
//   if (!params || !params.slug) {
//     return <div className="max-w-4xl mx-auto p-6">Invalid blog URL</div>
//   }

//   const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

//   const baseUrl = getBaseUrl()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [blog, setBlog] = useState<Blog | null>(null)
//   const [formData, setFormData] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     coverImage: "",
//     categories: "",
//     readTime: "5",
//     date: new Date().toISOString().split('T')[0]
//   })

//   // Fetch blog data
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
//           cache: "no-store"
//         })
        
//         if (!res.ok) throw new Error("Blog not found")
        
//         const { blog }: { blog: Blog } = await res.json()
//         setBlog(blog)
//         setFormData({
//           title: blog.title,
//           excerpt: blog.excerpt,
//           content: blog.content,
//           coverImage: blog.coverImage,
//           categories: blog.categories.join(", "),
//           readTime: blog.readTime.toString(),
//           date: blog.date.split('T')[0]
//         })
//       } catch (err) {
//         toast.error("Failed to load blog post")
//         router.push("/admin/blog/manage")
//       }
//     }

//     fetchBlog()
//   }, [slug, baseUrl, router])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const response = await fetch(`${baseUrl}/api/blog/edit?slug=${slug}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           categories: formData.categories
//             .split(",")
//             .map(cat => cat.trim())
//             .filter(Boolean),
//           readTime: parseInt(formData.readTime) || 5
//         })
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to update blog")
//       }

//       toast.success("Blog updated successfully!")
//       router.push(`/blog/${slug}`)
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Update failed")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!blog) return <div className="max-w-4xl mx-auto p-6">Loading...</div>

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Edit Blog: {blog.title}</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-2">Title *</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={(e) => setFormData({...formData, title: e.target.value})}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Excerpt *</label>
//           <textarea
//             name="excerpt"
//             value={formData.excerpt}
//             onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Cover Image URL</label>
//           <input
//             type="url"
//             name="coverImage"
//             value={formData.coverImage}
//             onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Content *</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={(e) => setFormData({...formData, content: e.target.value})}
//             className="w-full p-2 border rounded min-h-[300px]"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2">Categories</label>
//             <input
//               type="text"
//               name="categories"
//               value={formData.categories}
//               onChange={(e) => setFormData({...formData, categories: e.target.value})}
//               className="w-full p-2 border rounded"
//               placeholder="technology, programming"
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Read Time (minutes) *</label>
//             <input
//               type="number"
//               name="readTime"
//               value={formData.readTime}
//               onChange={(e) => setFormData({...formData, readTime: e.target.value})}
//               className="w-full p-2 border rounded"
//               min="1"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-2">Publish Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={(e) => setFormData({...formData, date: e.target.value})}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isSubmitting ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   )
// }
















// "use client"

// import { useState, useEffect, useCallback, useRef } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import toast from "react-hot-toast"
// import dynamic from "next/dynamic"

// // Dynamically import your editor with the same configuration
// const BlogEditor = dynamic(() => import('@/components/BlogEditor'), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>
// })

// interface Blog {
//   _id: string
//   title: string
//   slug: string
//   excerpt: string
//   content: string
//   coverImage: string
//   categories: string[]
//   date: string
//   readTime: string
//   views: number
// }

// export default function EditBlogPage() {
//   const router = useRouter()
//   const params = useParams()
//   const baseUrl = getBaseUrl()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [blog, setBlog] = useState<Blog | null>(null)
//   const [formData, setFormData] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     coverImage: "",
//     categories: "",
//     readTime: "5",
//     date: new Date().toISOString().split('T')[0]
//   })
//   const [fileUploading, setFileUploading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   // Handle null params early
//   if (!params || !params.slug) {
//     return <div className="max-w-4xl mx-auto p-6">Invalid blog URL</div>
//   }

//   // Get slug safely
//   const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

//   // Unified image upload handler (for both cover image and editor images)
//   const handleFileUpload = useCallback(async (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       toast.error("Please upload an image file")
//       return null
//     }

//     const formData = new FormData()
//     formData.append("file", file)

//     setFileUploading(true)
//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       })

//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || "Upload failed")

//       toast.success("Image uploaded successfully!")
//       return data.url
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Upload failed")
//       return null
//     } finally {
//       setFileUploading(false)
//     }
//   }, [])

//   // For cover image upload
//   const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const imageUrl = await handleFileUpload(file)
//     if (imageUrl) {
//       setFormData(prev => ({ ...prev, coverImage: imageUrl }))
//     }
//   }

//   // Fetch blog data
//   useEffect(() => {
//     if (!params?.slug) return

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/api/blog/${slug}`)
//         if (!res.ok) throw new Error("Blog not found")
        
//         const { blog }: { blog: Blog } = await res.json()
//         setBlog(blog)
//         setFormData({
//           title: blog.title,
//           excerpt: blog.excerpt,
//           content: blog.content,
//           coverImage: blog.coverImage,
//           categories: blog.categories.join(", "),
//           readTime: blog.readTime.toString(),
//           date: blog.date.split('T')[0]
//         })
//       } catch (err) {
//         toast.error("Failed to load blog post")
//         router.push("/admin/blog/manage")
//       }
//     }

//     fetchBlog()
//   }, [params?.slug])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const response = await fetch(`${baseUrl}/api/blog/edit?slug=${slug}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           categories: formData.categories.split(",").map(c => c.trim()).filter(Boolean),
//           readTime: parseInt(formData.readTime) || 5
//         })
//       })

//       if (!response.ok) throw new Error("Failed to update blog")
      
//       toast.success("Blog updated successfully!")
//       router.push(`/blog/${slug}`)
//     } catch (err) {
//       toast.error(err instanceof Error ? err.message : "Update failed")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!blog) return <div className="max-w-4xl mx-auto p-6">Loading...</div>

//   return (
//     <form onSubmit={handleSubmit} className="max-w-4xl mt-10 mx-auto p-6">
//       {/* Title Field */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Title</label>
//         <input
//           type="text"
//           value={formData.title}
//           onChange={(e) => setFormData({...formData, title: e.target.value})}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       {/* Excerpt Field */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Excerpt</label>
//         <textarea
//           value={formData.excerpt}
//           onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>

//       {/* Cover Image Upload */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Featured Image</label>
//         <div className="flex items-center gap-4">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleCoverImageUpload}
//             accept="image/*"
//             disabled={fileUploading}
//             className="hidden"
//           />
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={fileUploading}
//             className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
//           >
//             {fileUploading ? "Uploading..." : "Upload Cover Image"}
//           </button>
//           {formData.coverImage && (
//             <div className="relative">
//               <img
//                 src={formData.coverImage}
//                 alt="Cover preview"
//                 className="h-20 w-20 object-cover rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => setFormData({...formData, coverImage: ""})}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Blog Editor */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Content</label>
//         <BlogEditor
//           content={formData.content}
//           onChange={(content) => setFormData({...formData, content})}
//         />
//       </div>

//       {/* Categories */}
//       <div className="mb-6">
//         <label className="block mb-2 font-medium">Categories</label>
//         <input
//           type="text"
//           value={formData.categories}
//           onChange={(e) => setFormData({...formData, categories: e.target.value})}
//           className="w-full p-2 border rounded"
//           placeholder="technology, programming"
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting || fileUploading}
//         className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//       >
//         {isSubmitting ? "Saving..." : "Save Changes"}
//       </button>
//     </form>
//   )
// }




"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { getBaseUrl } from "@/lib/getBaseUrl"
import toast from "react-hot-toast"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, ImagePlus, Trash2, Save } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import EnhancedFooter from "@/components/enhanced-footer"

const BlogEditor = dynamic(() => import('@/components/BlogEditor'), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-md" />
})

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  categories: string[]
  date: string
  readTime: string
  views: number
}

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const baseUrl = getBaseUrl()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categories: "",
    readTime: "5",
    date: new Date().toISOString().split('T')[0]
  })
  const [fileUploading, setFileUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle null params early
  if (!params || !params.slug) {
    return (
      <Card className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-red-500 font-medium">Invalid blog URL</p>
        <Button onClick={() => router.push('/admin/blog/manage')} className="mt-4">
          Back to Dashboard
        </Button>
      </Card>
    )
  }

  // Get slug safely
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file")
      return null
    }

    const formData = new FormData()
    formData.append("file", file)

    setFileUploading(true)
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")

      toast.success("Image uploaded successfully!")
      return data.url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
      return null
    } finally {
      setFileUploading(false)
    }
  }, [])

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = await handleFileUpload(file)
    if (imageUrl) {
      setFormData(prev => ({ ...prev, coverImage: imageUrl }))
    }
  }

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/blog/${slug}`)
        if (!res.ok) throw new Error("Blog not found")
        
        const { blog }: { blog: Blog } = await res.json()
        setBlog(blog)
        setFormData({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          coverImage: blog.coverImage,
          categories: blog.categories.join(", "),
          readTime: blog.readTime.toString(),
          date: blog.date.split('T')[0]
        })
      } catch (err) {
        toast.error("Failed to load blog post")
        router.push("/admin/blog/manage")
      }
    }

    fetchBlog()
  }, [slug, baseUrl, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${baseUrl}/api/blog/edit?slug=${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          categories: formData.categories.split(",").map(c => c.trim()).filter(Boolean),
          readTime: parseInt(formData.readTime) || 5
        })
      })

      if (!response.ok) throw new Error("Failed to update blog")
      
      toast.success("Blog updated successfully!")
      router.push(`/blog/${slug}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="max-w-4xl mt-20 mx-auto p-4">
      <Card>
        <CardHeader className="pb-0">
          <h1 className="text-2xl font-bold text-primary">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update your content and publish changes</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter your blog title"
                required
              />
            </div>

            {/* Excerpt Field */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="A short preview of your post"
                rows={3}
              />
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label>Featured Image</Label>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCoverImageUpload}
                    accept="image/*"
                    disabled={fileUploading}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={fileUploading}
                    className="gap-2"
                  >
                    <ImagePlus className="h-4 w-4" />
                    {fileUploading ? "Uploading..." : "Upload Cover Image"}
                  </Button>
                  {formData.coverImage && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setFormData({...formData, coverImage: ""})}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
                
                {formData.coverImage && (
                  <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Blog Editor */}
            <div className="space-y-2">
              <Label>Content *</Label>
              <BlogEditor
                content={formData.content}
                onChange={(content) => setFormData({...formData, content})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  value={formData.categories}
                  onChange={(e) => setFormData({...formData, categories: e.target.value})}
                  placeholder="technology, programming"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple categories with commas
                </p>
              </div>

              {/* Reading Time */}
              <div className="space-y-2">
                <Label htmlFor="readTime">Reading Time (minutes) *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    type="number"
                    min="1"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Publish Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Publish Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || fileUploading}
                className="gap-2 w-full sm:w-auto"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    <EnhancedFooter/>
    </>
  )
}