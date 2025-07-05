// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { gsap } from 'gsap'
// import Image from 'next/image'
// import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent, CardFooter } from '@/components/ui/card'
// import { useToast } from '@/components/ui/use-toast'
// import { useRouter } from 'next/navigation'
// import EnhancedFooter from '@/components/enhanced-footer'
// import { Input } from '@/components/ui/input'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// type Blog = {
//     _id: string
//     title: string
//     slug: string
//     excerpt: string
//     content: string
//     coverImage: string
//     date: string
//     readTime: string
//     views: number
//     categories: string[]
// }

// const Blog = () => {
//     const [blogs, setBlogs] = useState<Blog[]>([])
//     const [totalPages, setTotalPages] = useState(1)
//     const [currentPage, setCurrentPage] = useState(1)
//     const [search, setSearch] = useState('')
//     const [selectedTag, setSelectedTag] = useState('')
//     const [hovered, setHovered] = useState<string | null>(null)
//     const sectionRef = useRef<HTMLElement>(null)
//     const { toast } = useToast()
//     const router = useRouter()
//     const [isClient, setIsClient] = useState(false)

//     useEffect(() => setIsClient(true), [])

//     useEffect(() => {
//         if (sectionRef.current) {
//             gsap.fromTo(
//                 sectionRef.current,
//                 { opacity: 0, y: 40 },
//                 { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
//             )
//         }
//     }, [])

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 const query = new URLSearchParams({
//                     page: String(currentPage),
//                     limit: '4',
//                     search,
//                     tag: selectedTag,
//                 })

//                 const res = await fetch(`/api/blog?${query.toString()}`)
//                 const data = await res.json()
//                 setBlogs(data.blogs)
//                 setTotalPages(data.totalPages)
//             } catch (err) {
//                 toast({ title: 'Failed to fetch blogs', description: 'Please try again.' })
//             }
//         }

//         fetchBlogs()
//     }, [toast, currentPage, search, selectedTag])

//     const handleReadMore = (slug: string) => {
//         router.push(`/blog/${slug}`)
//     }

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearch(e.target.value)
//         setCurrentPage(1)
//     }

//     const handleTagChange = (value: string) => {
//         setSelectedTag(value === "all" ? "" : value)
//         setCurrentPage(1)
//     }

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page)
//     }

//     const uniqueTags = Array.from(new Set(blogs.flatMap(blog => blog.categories)))

//     return (
//         <section ref={sectionRef} className="py-14 px-6 md:px-16 bg-background text-foreground">
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl font-bold">Blog & Thoughts 💡</h2>
//                 <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
//                     Sharing dev learnings, martial art lessons, and product building stories.
//                 </p>
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//                 <Input
//                     placeholder="Search blog..."
//                     value={search}
//                     onChange={handleSearchChange}
//                     className="w-full md:w-1/2"
//                 />

//                 <Select onValueChange={handleTagChange} value={selectedTag}>
//                     <SelectTrigger className="w-full md:w-[200px]">
//                         <SelectValue placeholder="Filter by Tag" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All</SelectItem>
//                         {isClient &&
//                             uniqueTags.map((tag, i) => (
//                                 <SelectItem key={i} value={tag}>
//                                     {tag}
//                                 </SelectItem>
//                             ))}
//                     </SelectContent>
//                 </Select>
//             </div>

//             {isClient && blogs.length > 0 && (
//                 <div className="grid sm:grid-cols-2 gap-10 mb-10 md:grid-cols-3">
//                     {blogs.map((post) => (
//                         <Card
//                             key={post._id}
//                             onMouseEnter={() => setHovered(post._id)}
//                             onMouseLeave={() => setHovered(null)}
//                             className="shadow-lg border-none transition-transform duration-300 hover:scale-[1.01]"
//                         >
//                             <div className="relative h-56 w-full overflow-hidden rounded-t-xl">
//                                 <Image
//                                     src={post.coverImage}
//                                     alt={post.title}
//                                     fill
//                                     className={`object-cover transition-transform duration-500 ${hovered === post._id ? 'scale-110' : 'scale-100'
//                                         }`}
//                                 />
//                             </div>

//                             <CardContent className="p-6">
//                                 <div className="flex flex-wrap gap-2 mb-3">
//                                     {post.categories.map((cat, i) => (
//                                         <Badge key={i} variant="outline" className="text-xs">
//                                             {cat}
//                                         </Badge>
//                                     ))}
//                                 </div>

//                                 <h3 className="text-xl font-bold mb-2">{post.title}</h3>
//                                 <p className="text-muted-foreground text-sm">{post.excerpt}</p>
//                             </CardContent>

//                             <CardFooter className="px-6 pb-6 flex justify-between text-xs text-muted-foreground">
//                                 <div className="flex gap-2 items-center">
//                                     <Calendar className="w-3 h-3" />
//                                     <span>{post.date}</span>
//                                 </div>
//                                 <div className="flex gap-2 items-center">
//                                     <Clock className="w-3 h-3" />
//                                     <span>{post.readTime}</span>
//                                 </div>
//                                 <div className="flex gap-2 items-center">
//                                     <Eye className="w-3 h-3" />
//                                     <span>{isClient ? post.views.toLocaleString() : post.views}</span>
//                                 </div>
//                             </CardFooter>

//                             <div className="px-6 pb-6">
//                                 <Button
//                                     onClick={() => handleReadMore(post.slug)}
//                                     variant="default"
//                                     className="w-full flex gap-2 group"
//                                 >
//                                     Read More
//                                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                                 </Button>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex justify-center gap-2 mb-10">
//                     {Array.from({ length: totalPages }, (_, i) => (
//                         <Button
//                             key={i}
//                             variant={currentPage === i + 1 ? 'default' : 'outline'}
//                             onClick={() => handlePageChange(i + 1)}
//                             className="px-4"
//                         >
//                             {i + 1}
//                         </Button>
//                     ))}
//                 </div>
//             )}



//             <EnhancedFooter />
//         </section>
//     )
// }

// export default Blog



'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Calendar, Clock, Eye, ArrowRight, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import EnhancedFooter from '@/components/enhanced-footer'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  readTime: string
  views: number
  categories: string[]
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = new URLSearchParams({
          page: String(currentPage),
          limit: '6',
          search,
          tag: selectedTag,
        })

        const res = await fetch(`/api/blog?${query.toString()}`)
        const data = await res.json()
        setBlogs(data.blogs)
        setTotalPages(data.totalPages)
      } catch (err) {
        toast({
          title: 'Failed to fetch blogs',
          description: 'Please try again.',
          variant: 'destructive'
        })
      }
    }

    fetchBlogs()
  }, [toast, currentPage, search, selectedTag])

  const handleReadMore = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value === "all" ? "" : value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const uniqueTags = Array.from(new Set(blogs.flatMap(blog => blog.categories)))

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Articles & Case Studies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore full-stack builds, real-world challenges, and scalable MVPs — insights from hands-on coding, product thinking, and freelance dev journeys.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-muted/50 p-6 rounded-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10"
            />
          </div>

          {/* Tag Select + Login Button */}
          <div className="w-full md:w-auto flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Select onValueChange={handleTagChange} value={selectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {isClient &&
                    uniqueTags.map((tag, i) => (
                      <SelectItem key={i} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* 🚀 Beautiful Login Button */}
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-background text-white px-4 py-2 rounded-md hover:text-primary border transition-colors"
            >
              🔐 Admin Login
            </a>
          </div>
        </div>


        {/* Blog Grid */}
        {isClient && blogs.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {blogs.map((post) => (
                <Card
                  key={post._id}
                  onMouseEnter={() => setHovered(post._id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group overflow-hidden border border-muted shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className={`object-cover transition-all duration-500 ${hovered === post._id ? 'scale-105' : 'scale-100'}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hovered === post._id ? 'opacity-100' : 'opacity-70'}`} />
                  </div>

                  <CardHeader className="px-6 pt-6 pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((cat, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                  </CardHeader>

                  <CardContent className="px-6 pb-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleReadMore(post.slug)}
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-16">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'ghost'}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 p-0 rounded-full ${currentPage === i + 1 ? 'shadow-md' : ''}`}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-muted-foreground">
              {search || selectedTag ? 'No matching articles found' : 'No articles published yet'}
            </h3>
            {(search || selectedTag) && (
              <Button
                variant="ghost"
                className="mt-4"
                onClick={() => {
                  setSearch('')
                  setSelectedTag('')
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}

        <EnhancedFooter />
      </div>
    </section>
  )
}

export default Blog







