// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { motion } from "framer-motion"
// import Image from "next/image"
// import { Calendar, Clock, Eye, ArrowRight } from "lucide-react"

// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

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
//   featured?: boolean
// }

// export default function BlogPreview() {
//   const [blogs, setBlogs] = useState<Blog[]>([])
//   const [hoveredPost, setHoveredPost] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch("/api/blog") // assumes your GET handler is here
//         const data = await res.json()
//         if (res.ok) setBlogs(data.blogs || [])
//       } catch (error) {
//         console.error("Failed to fetch blogs:", error)
//       }
//     }

//     fetchBlogs()
//   }, [])

//   const featuredPost = blogs.find((post) => post.featured)
//   const regularPosts = blogs.filter((post) => !post.featured).slice(0, 3)

//   const handleReadMore = (slug: string) => {
//     router.push(`/blog/${slug}`)
//   }

//   return (
//     <section id="blog" className="py-12 px-4">
//       <h2 className="text-3xl font-bold text-center mb-4">Latest Articles</h2>
//       <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
//         Thoughts, insights, and perspectives on AI, technology, and community building.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {featuredPost && (
//           <motion.div
//             className="md:col-span-3 mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <Card
//               className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10"
//               onMouseEnter={() => setHoveredPost(featuredPost._id)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               <div className="grid md:grid-cols-2 gap-0">
//                 <div className="relative aspect-video md:aspect-auto overflow-hidden">
//                   <Image
//                     src={featuredPost.coverImage}
//                     alt={featuredPost.title}
//                     fill
//                     className={cn(
//                       "object-cover transition-transform duration-500",
//                       hoveredPost === featuredPost._id ? "scale-110" : "scale-100"
//                     )}
//                   />
//                   <div className="absolute top-4 left-4">
//                     <Badge className="bg-primary text-primary-foreground">Featured</Badge>
//                   </div>
//                 </div>

//                 <CardContent className="p-6 flex flex-col justify-between">
//                   <div>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {featuredPost.categories.map((category, index) => (
//                         <Badge key={index} variant="outline">
//                           {category}
//                         </Badge>
//                       ))}
//                     </div>

//                     <h3 className="text-xl font-bold mb-3">{featuredPost.title}</h3>
//                     <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-4 w-4" />
//                       <span>{featuredPost.date}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" />
//                       <span>{featuredPost.readTime}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Eye className="h-4 w-4" />
//                       <span>{featuredPost.views.toLocaleString()} views</span>
//                     </div>
//                   </div>

//                   <Button
//                     variant="default"
//                     className="w-full gap-2 group"
//                     onClick={() => handleReadMore(featuredPost.slug)}
//                   >
//                     Read Article
//                     <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                   </Button>
//                 </CardContent>
//               </div>
//             </Card>
//           </motion.div>
//         )}

//         {regularPosts.map((post, index) => (
//           <motion.div
//             key={post._id}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Card
//               className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-shadow duration-300"
//               onMouseEnter={() => setHoveredPost(post._id)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               <div className="relative aspect-video overflow-hidden">
//                 <Image
//                   src={post.coverImage}
//                   alt={post.title}
//                   fill
//                   className={cn(
//                     "object-cover transition-transform duration-500",
//                     hoveredPost === post._id ? "scale-110" : "scale-100"
//                   )}
//                 />
//               </div>

//               <CardContent className="p-5 flex-1">
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {post.categories.map((category, index) => (
//                     <Badge key={index} variant="outline" className="text-xs">
//                       {category}
//                     </Badge>
//                   ))}
//                 </div>

//                 <h3 className="font-bold mb-2">{post.title}</h3>
//                 <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
//               </CardContent>

//               <CardFooter className="p-5 pt-0 flex justify-between items-center">
//                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <Calendar className="h-3 w-3" />
//                   <span>{post.date}</span>
//                 </div>

//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="gap-1 p-0 h-auto hover:bg-transparent hover:text-primary"
//                   onClick={() => handleReadMore(post.slug)}
//                 >
//                   <span>Read more</span>
//                   <ArrowRight className="h-3 w-3" />
//                 </Button>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8">
//         <Button
//           onClick={() => router.push("/blog")}
//           variant="outline"
//           className="gap-2"
//         >
//           View All Articles
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </section>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Clock, Eye, ArrowRight, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

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
  featured?: boolean
}

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog")
        const data = await res.json()
        if (res.ok) setBlogs(data.blogs || [])
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const featuredPost = blogs.find((post) => post.featured)
  const regularPosts = blogs.filter((post) => !post.featured).slice(0, 3)

  const handleReadMore = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  if (loading) {
    return (
      <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
           Articles & Case Studies
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
           Explore full-stack builds, real-world challenges, and scalable MVPs — insights from hands-on coding, product thinking, and freelance dev journeys.
          </p>
        </motion.div>

        <div className="space-y-12">
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-2xl transition-shadow duration-300"
                onMouseEnter={() => setHoveredPost(featuredPost._id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto overflow-hidden">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-500",
                        hoveredPost === featuredPost._id ? "scale-105" : "scale-100"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.categories.map((category, index) => (
                          <Badge key={index} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{featuredPost.views.toLocaleString()} views</span>
                        </div>
                      </div>

                      <Button
                        variant="default"
                        className="w-full gap-2 group"
                        onClick={() => handleReadMore(featuredPost.slug)}
                      >
                        Read Full Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="overflow-hidden h-full flex flex-col border border-muted hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300"
                  onMouseEnter={() => setHoveredPost(post._id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className={cn(
                        "object-cover transition-all duration-500",
                        hoveredPost === post._id ? "scale-105" : "scale-100"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <CardContent className="p-6 flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-bold text-lg mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-primary hover:text-primary/80 hover:bg-primary/5"
                      onClick={() => handleReadMore(post.slug)}
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={() => router.push("/blog")}
            variant="outline"
            className="gap-2 px-8 py-5 rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}



