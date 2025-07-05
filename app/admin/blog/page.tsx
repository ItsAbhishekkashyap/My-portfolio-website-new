// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-toast"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { useRouter } from "next/navigation"
// import RichTextEditor from "@/components/RichTextEditor"



// interface BlogFormData {
//     title: string
//     slug: string
//     excerpt: string
//     content: string
//     date: string
//     readTime: string
//     coverImage: string
//     categories: string
// }

// export default function AdminBlogForm() {
//     const [formData, setFormData] = useState<BlogFormData>({
//         title: "",
//         slug: "",
//         excerpt: "",
//         content: "",
//         date: "",
//         readTime: "",
//         coverImage: "",
//         categories: "",
//     })

//     const [isSubmitting, setIsSubmitting] = useState(false)
//     const [uploading, setUploading] = useState(false)
//     const fileInputRef = useRef<HTMLInputElement | null>(null)
//     const { toast } = useToast()
//     const router = useRouter()
//     const [isClient, setIsClient] = useState(false)
//     const [content, setContent] = useState('')

//     useEffect(() => {
//         setIsClient(true)
//     }, [])


//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0]
//         if (!file) return

//         const form = new FormData()
//         form.append("file", file)

//         setUploading(true)
//         try {
//             const res = await fetch("/api/upload", {
//                 method: "POST",
//                 body: form,
//             })
//             const data = await res.json()
//             setFormData((prev) => ({ ...prev, coverImage: data.imageUrl }))
//             toast({ title: "Image uploaded!" })
//         } catch (err) {
//             toast({ title: "Upload failed", variant: "destructive" })
//         } finally {
//             setUploading(false)
//         }
//     }

//     const handleSubmit = async () => {
//         setIsSubmitting(true)
//         try {
//             const res = await fetch("/api/blog/create", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     ...formData,
//                     categories: formData.categories.split(",").map((cat) => cat.trim()),
//                 }),
//             })

//             const result = await res.json()
//             if (res.ok) {
//                 toast({ title: "Blog created!" })
//                 router.push("/blog")
//             } else {
//                 toast({ title: result.message, variant: "destructive" })
//             }
//         } catch (err) {
//             toast({ title: "Submit failed", variant: "destructive" })
//         } finally {
//             setIsSubmitting(false)
//         }
//     }




//     return (
//         <div className="max-w-3xl mx-auto py-10 space-y-6 px-4">
//             <h2 className="text-2xl font-bold">Create New Blog</h2>

//             <div className="grid grid-cols-1 gap-4">
//                 <div>
//                     <Label>Title</Label>
//                     <Input name="title" value={formData.title} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                     <Label>Slug</Label>
//                     <Input name="slug" value={formData.slug} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                     <Label>Excerpt</Label>
//                     <Textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block font-semibold mb-2">Blog Content</label>
//                     <RichTextEditor
//                         value={formData.content}
//                         onChange={(value) =>
//                             setFormData((prev) => ({ ...prev, content: value }))
//                         }
//                     />
//                 </div>

//                 <div className="flex gap-4">
//                     <div className="flex-1">
//                         <Label>Date</Label>
//                         <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
//                     </div>
//                     <div className="flex-1">
//                         <Label>Read Time</Label>
//                         <Input name="readTime" value={formData.readTime} onChange={handleInputChange} />
//                     </div>
//                 </div>
//                 <div>
//                     <Label>Categories (comma separated)</Label>
//                     <Input name="categories" value={formData.categories} onChange={handleInputChange} />
//                 </div>

//                 <div>
//                     <Label>Cover Image</Label>
//                     <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} />
//                     {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
//                     {formData.coverImage && (
//                         <img
//                             src={formData.coverImage}
//                             alt="Cover"
//                             className="mt-2 w-full h-48 object-cover rounded-md border"
//                         />
//                     )}
//                 </div>

//                 <Button disabled={isSubmitting || uploading} onClick={handleSubmit}>
//                     {isSubmitting ? "Submitting..." : "Create Blog"}
//                 </Button>
//             </div>
//         </div>
//     )
// }




















// app/admin/blog/page.tsx

import { Suspense } from "react"
import AdminBlogFormClient from "@/components/AdminBlogFormClient"

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading form...</div>}>
      <AdminBlogFormClient />
    </Suspense>
  )
}

