
// import { notFound } from "next/navigation"
// import { Metadata } from "next"
// import Image from "next/image"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import { useRouter } from "next/navigation"
// import { toast } from "@/components/ui/use-toast"
// import { isAdmin } from "@/utils/auth"


// interface Blog {
//   _id: string
//   title: string
//   slug: string
//   excerpt: string
//   content: string
//   date: string
//   readTime: string
//   views: number
//   coverImage: string
//   categories: string[]
// }

// // 🧠 SEO Meta Tags
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string }
// }): Promise<Metadata> {
//   const baseUrl = getBaseUrl()

//   const res = await fetch(`${baseUrl}/api/blog/${params.slug}`, {
//     cache: "no-store",
//   })

//   if (!res.ok) return {}

//   const { blog }: { blog: Blog } = await res.json()

//   return {
//     title: blog.title,
//     description: blog.excerpt,
//     openGraph: {
//       title: blog.title,
//       description: blog.excerpt,
//       images: [blog.coverImage],
//     },
//   }
// }

// // 🧾 Blog Page
// export default async function BlogPostPage({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   const baseUrl = getBaseUrl()

//   const res = await fetch(`${baseUrl}/api/blog/${params.slug}`, {
//     cache: "no-store",
//   })

//   if (!res.ok) return notFound()

//   const { blog }: { blog: Blog } = await res.json()

//    const router = useRouter()

//    const handleDelete = async () => {
//     const confirmDelete = confirm("Are you sure you want to delete this blog?")
//     if (!confirmDelete) return

//     try {
//       const res = await fetch(`/api/blog/delete?slug=${blog.slug}`, { method: "DELETE" })
//       if (!res.ok) throw new Error("Failed to delete")

//       toast({ title: "Deleted successfully" })
//       router.push("/admin/blog")
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to delete", variant: "destructive" })
//     }
//   }

//   return (
//     <main className="max-w-3xl mx-auto px-6 py-14 bg-background text-foreground">
//       <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//       <div className="text-muted-foreground text-sm mb-6">
//         {blog.date} • {blog.readTime} • {blog.views.toLocaleString()} views
//       </div>

//       {blog.coverImage && (
//         <div className="mb-6 relative aspect-video w-full overflow-hidden rounded-xl">
//           <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
//         </div>
//       )}

//       <article
//         className="prose prose-neutral dark:prose-invert max-w-none"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       {isAdmin() && (
//         <div className="flex gap-4 mt-8">
//           <button
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//             onClick={() => router.push(`/admin/blog/edit/${blog.slug}`)}
//           >
//             ✏️ Edit
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded"
//             onClick={handleDelete}
//           >
//             🗑 Delete
//           </button>
//         </div>
//       )}
//     </main>
//   )
// }







// This is working code below one:

// import { notFound } from "next/navigation"
// import { Metadata } from "next"
// import Image from "next/image"
// import { getBaseUrl } from "@/lib/getBaseUrl"
// import { AdminButtons } from "./AdminButtons"
// import { isAdminServer } from "@/lib/auth"

// interface Blog {
//   _id: string
//   title: string
//   slug: string
//   excerpt: string
//   content: string
//   date: string
//   readTime: string
//   views: number
//   coverImage: string
//   categories: string[]
// }

// export async function generateMetadata(
//   { params }: { params: { slug: string } }
// ): Promise<Metadata> {
//   const baseUrl = getBaseUrl()
//   const slug = params.slug // Access slug directly from params

//   try {
//     const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
//       cache: "no-store"
//     })

//     if (!res.ok) {
//       return {
//         title: "Blog Post",
//         description: "A blog post on our site"
//       }
//     }

//     const { blog }: { blog: Blog } = await res.json()

//     return {
//       metadataBase: new URL(baseUrl),
//       title: blog.title,
//       description: blog.excerpt,
//       openGraph: {
//         title: blog.title,
//         description: blog.excerpt,
//         images: [blog.coverImage]
//       }
//     }
//   } catch {
//     return {
//       title: "Blog Post",
//       description: "A blog post on our site"
//     }
//   }
// }

// export default async function BlogPostPage(
//   { params }: { params: { slug: string } }
// ) {
//   const baseUrl = getBaseUrl()
//   const slug = params.slug // Access slug directly from params

//   const [res, isAdmin] = await Promise.all([
//     fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" }),
//     isAdminServer()
//   ])

//   if (!res.ok) return notFound()

//   const { blog }: { blog: Blog } = await res.json()

//   return (
//     <main className="max-w-3xl mx-auto px-6 py-14 bg-background text-foreground">
//       <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
//       <div className="text-muted-foreground text-sm mb-6">
//         {blog.date} • {blog.readTime} min read • {blog.views.toLocaleString()} views
//       </div>

//       {blog.coverImage && (
//         <div className="mb-6 relative aspect-video w-full overflow-hidden rounded-xl">
//           <Image
//             src={blog.coverImage}
//             alt={blog.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//       )}

//       <article
//         className="prose prose-neutral dark:prose-invert max-w-none"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       {/* Admin-only buttons */}
//       {isAdmin && <AdminButtons slug={blog.slug} />}
//     </main>
//   )
// }

import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { getBaseUrl } from "@/lib/getBaseUrl"
import { AdminButtons } from "./AdminButtons"
import { isAdminServer } from "@/lib/auth"
import { Calendar, Clock, Eye, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EnhancedFooter from "@/components/enhanced-footer"

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: string
  views: number
  coverImage: string
  categories: string[]
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const baseUrl = getBaseUrl()
  const slug = params.slug

  try {
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: "no-store"
    })

    if (!res.ok) {
      return {
        title: "Blog Post",
        description: "A blog post on our site"
      }
    }

    const { blog }: { blog: Blog } = await res.json()

    return {
      metadataBase: new URL(baseUrl),
      title: `${blog.title} | My Blog`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [{
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title
        }],
        type: 'article',
        publishedTime: blog.date
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: [blog.coverImage]
      }
    }
  } catch {
    return {
      title: "Blog Post",
      description: "A blog post on our site"
    }
  }
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const baseUrl = getBaseUrl()
  const slug = params.slug

  const [res, isAdmin] = await Promise.all([
    fetch(`${baseUrl}/api/blog/${slug}`, { cache: "no-store" }),
    isAdminServer()
  ])

  if (!res.ok) return notFound()

  const { blog }: { blog: Blog } = await res.json()

  return (
    <>
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <article className="relative">
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl pb-2 font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{blog.views.toLocaleString()} views</span>
            </div>
          </div>

          {blog.coverImage && (
            <div className="mb-8 relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded prose-img:rounded-xl prose-img:shadow-md">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mt-12 border-t pt-8">
            <AdminButtons slug={blog.slug} />
          </div>
        )}
      </article>

     
    </main>
     <EnhancedFooter/>
     </>
  )
}
