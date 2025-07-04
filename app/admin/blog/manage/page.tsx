// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import toast from "react-hot-toast"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import { useRouter } from "next/navigation"


// interface Blog {
//     _id: string
//     title: string
//     slug: string
//     date: string
//     categories: string[]
//     views: number
// }

// export default function BlogManagementPage() {
//     const [blogs, setBlogs] = useState<Blog[]>([])
//     const [isLoading, setIsLoading] = useState<boolean>(true)
//     const [error, setError] = useState<string | null>(null)
//     const baseUrl = getBaseUrl()
//     const router = useRouter()


//     const fetchBlogs = async (): Promise<void> => {
//         try {
//             setIsLoading(true)
//             setError(null)

//             const response = await fetch(`${baseUrl}/api/blog/list`)

//             if (!response.ok) {
//                 throw new Error(`Failed to load: ${response.status}`)
//             }

//             const data = await response.json()

//             if (!data.blogs) {
//                 throw new Error('Invalid response format')
//             }

//             setBlogs(data.blogs)
//         } catch (err) {
//             const message = err instanceof Error ? err.message : 'Failed to fetch blogs'
//             setError(message)
//             toast.error(message)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const handleDelete = async (slug: string): Promise<void> => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this blog post?")
//         if (!confirmDelete) return

//         try {
//             const response = await fetch(`/api/blog/delete?slug=${slug}`, {
//                 method: 'DELETE',
//             })

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`)
//             }

//             toast.success('Blog post deleted successfully')
//             fetchBlogs() // Refresh the list
//         } catch (err) {
//             const error = err instanceof Error ? err.message : 'Failed to delete blog post'
//             toast.error(error)
//         }
//     }

//     useEffect(() => {
//         fetchBlogs()
//     }, [])

//     const handleRoute = () => {
//         router.push("/admin/blog")
//     }

//     const handleLogout = async () => {
//         await fetch("/api/auth/logout")
//         toast.success( "Logged out successfully "),
//              // or "success" if you created it yourself
    
//         router.push("/login")
//     }

//     if (isLoading) {
//         return (
//             <div className="max-w-4xl mx-auto p-6">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
//                 </div>
//                 <p>Loading posts...</p>
//             </div>
//         )
//     }

//     if (error) {
//         return (
//             <div className="max-w-4xl mx-auto p-6">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
//                 </div>
//                 <p className="text-red-500">Error: {error}</p>
//                 <Button onClick={fetchBlogs} className="mt-4">
//                     Retry
//                 </Button>
//             </div>
//         )
//     }

//     return (
//         <div className="max-w-4xl mt-10 mx-auto p-6">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
//                 <div className="gap-4 flex ">
//                     <Button className="cursor-pointer " onClick={handleRoute}>Create New Post</Button>
//                     <Button
//                         onClick={handleLogout}
//                         className="bg-foreground text-slate-900 cursor-pointer px-4 py-2 rounded hover:text-white hover:bg-red-700 transition"
//                     >
//                         Logout
//                     </Button>
//                 </div>

//             </div>

//             {blogs.length === 0 ? (
//                 <div className="text-center py-12">
//                     <p className="text-muted-foreground mb-4">No blog posts found</p>
//                     <Link href="/admin/blog">
//                         <Button>Create Your First Post</Button>
//                     </Link>
//                 </div>
//             ) : (
//                 <div className="space-y-4">
//                     {blogs.map((blog) => (
//                         <div
//                             key={blog._id}
//                             className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                         >
//                             <div>
//                                 <h3 className="font-medium">{blog.title}</h3>
//                                 <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
//                                     <span>{new Date(blog.date).toLocaleDateString()}</span>
//                                     <span>{blog.views} views</span>
//                                     {blog.categories.length > 0 && (
//                                         <span>{blog.categories.join(", ")}</span>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="flex gap-2">
//                                 <Link href={`/admin/blog/edit/${blog.slug}`}>
//                                     <Button variant="outline" size="sm">
//                                         Edit
//                                     </Button>
//                                 </Link>
//                                 <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => handleDelete(blog.slug)}
//                                     className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                                 >
//                                     Delete
//                                 </Button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     )
// }



"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { getBaseUrl } from "@/lib/getBaseUrl"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Calendar, Eye, Edit, Trash2, Plus, LogOut } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import EnhancedFooter from "@/components/enhanced-footer"

interface Blog {
  _id: string
  title: string
  slug: string
  date: string
  categories: string[]
  views: number
}

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const baseUrl = getBaseUrl()
  const router = useRouter()

  const fetchBlogs = async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`${baseUrl}/api/blog/list`)
      
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`)
      }

      const data = await response.json()
      if (!data.blogs) throw new Error('Invalid response format')
      
      setBlogs(data.blogs)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch blogs'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (slug: string): Promise<void> => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?")
    if (!confirmDelete) return

    try {
      const response = await fetch(`/api/blog/delete?slug=${slug}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      toast.success('Blog post deleted successfully')
      fetchBlogs()
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to delete blog post'
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleRoute = () => router.push("/admin/blog")
  const handleLogout = async () => {
    await fetch("/api/auth/logout")
    toast.success("Logged out successfully")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
          <Button onClick={fetchBlogs} variant="outline">
            Retry
          </Button>
        </div>
        <Card className="p-6 text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </Card>
      </div>
    )
  }

  return (
    <>
    <div className="max-w-6xl mx-auto mt-10 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl pb-2 font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Blog Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your published articles and drafts
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button onClick={handleRoute} className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">
            No blog posts found
          </h3>
          <Button onClick={handleRoute} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Post
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog._id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{blog.views.toLocaleString()} views</span>
                    </div>
                    {blog.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {blog.categories.map((cat, i) => (
                          <span key={i} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Link href={`/admin/blog/edit/${blog.slug}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog.slug)}
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
    <EnhancedFooter/>
    </>
  )
}