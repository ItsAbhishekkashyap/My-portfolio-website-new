"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  ExternalLink,
  Github,
  Code,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Star,
  Layers,
  Cpu,
  Globe,
  Database,
  BookOpen,
  Share2,
  Shield,
  MessageSquare,
  Zap,
  Loader2,
} from "lucide-react"

// Project categories
const projectCategories = [
  { id: "all", name: "All Projects" },
  { id: "ai", name: "AI & ML", icon: <Cpu className="h-4 w-4" /> },
  // { id: "audio", name: "Audio", icon: <Zap className="h-4 w-4" /> },
  { id: "web", name: "Web Dev", icon: <Globe className="h-4 w-4" /> },
  { id: "data", name: "Data Science", icon: <Database className="h-4 w-4" /> },
  // { id: "network", name: "Network", icon: <Share2 className="h-4 w-4" /> },
  // { id: "security", name: "Security", icon: <Shield className="h-4 w-4" /> },
  // { id: "communication", name: "Communication", icon: <MessageSquare className="h-4 w-4" /> },
  // { id: "research", name: "Research", icon: <BookOpen className="h-4 w-4" /> },
]

// Project data
const projects = [


  {
  id: 1,
  title: "Branqly — Smart Link Management SaaS",
  category: "web",
  description:
    "A full-featured SaaS platform to shorten, brand, analyze, and manage smart links with advanced analytics and custom domains.",
  longDescription:
    "Branqly is a production-ready SaaS web application that empowers creators, marketers, and businesses to manage their links like pros. Built with Next.js, Tailwind CSS, and MongoDB, Branqly offers branded URL shortening, detailed analytics (device, region, IP), QR code generation, and dynamic redirection based on location or device. With clean UI, authentication via Clerk, and seamless dashboard navigation, it's designed to demonstrate high-level full-stack skills in building real-world scalable platforms.",
  technologies: ["Next.js", "Tailwind CSS","Typescript", "MongoDB", "jwt Auth", "Chart.js", "Vercel"],
  imageUrl: "/branqly.png", 
  demoUrl: "https://branqly.xyz",
  githubUrl: "https://github.com/ItsAbhishekkashyap/branqly", 
  color: "from-pink-500 to-purple-700",
  featured: true,
  completed: "2025",
  teamSize: 1,
  difficulty: 5,
  achievements: [
    "Developed a complete link shortening and branding platform from scratch",
    "Integrated advanced analytics showing region, device, IP, and click timestamps",
    "Implemented QR code and custom alias generation",
    "Built user authentication and session handling with jwt",
    "Designed a responsive, modern dashboard UI using Tailwind CSS and Chart.js",
    "Deployed fully on Vercel with a custom domain (branqly.xyz)",
  ],
},

{
  id: 2,
  title: "Sayvia — Anonymous Feedback Platform",
  category: "web",
  description:
    "A privacy-focused SaaS platform for sending and receiving anonymous feedback with AI-powered writing assistance, spam filtering, and dark mode support.",
  longDescription:
    "Sayvia is a modern full-stack web application built using Next.js, TypeScript, and MongoDB that enables users to receive completely anonymous feedback without revealing their identity. It includes an integrated AI assistant to help users write better feedback messages, alongside powerful safeguards like rate limiting, spam detection, and bad word filtering to maintain content quality. With support for both light and dark modes, Sayvia delivers a clean and respectful experience for feedback exchange while showcasing real-world SaaS-grade engineering practices.",
  technologies: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "OpenAI API",
    "Rate Limiting",
    "Content Filtering",
    "Dark Mode"
  ],
  imageUrl: "/sayvia.png", // replace with actual screenshot path
  demoUrl: "sayvia.xyz", // replace with deployment link if hosted
  githubUrl: "https://github.com/ItsAbhishekkashyap/sayvia", // adjust if private or hosted elsewhere
  color: "from-indigo-500 to-slate-900",
  featured: false,
  completed: "2025",
  teamSize: 1,
  difficulty: 5,
  achievements: [
    "Built a secure anonymous feedback system with full privacy",
    "Integrated OpenAI-based AI Assistant to guide users in writing meaningful feedback",
    "Implemented rate limiting and spam protection to prevent misuse",
    "Added bad word filtering to maintain respectful communication",
    "Supported theme switching with fully responsive light/dark mode UI",
    "Structured project using modular TypeScript and scalable folder architecture",
  ],
},


  {
    id: 3,
    title: "Encore '25 — College Fest Website",
    category: "web",
    description:
      "A vibrant and responsive website designed for IET Lucknow’s biggest annual fest — Encore 2025.",
    longDescription:
      "Crafted the complete frontend for Encore '25, the flagship college fest of IET Lucknow. The website features responsive layouts, and an aesthetic UI built to capture the excitement of the event. It serves as a dynamic platform for event showcases, registrations, and real-time updates. Designed with a visual appeal in mind to enhance user engagement and fest branding.",
    technologies: ["HTML", "Tailwind CSS", "Framer Motion", "Gsap"],
    imageUrl: "/encore.png", 
    demoUrl: "https://encore25.vercel.app",
    githubUrl: "https://github.com/ItsAbhishekkashyap", 
    color: "from-indigo-600 to-pink-500",
    featured: true,
    completed: "2025",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Designed and built the complete frontend from scratch",
      "Integrated responsive design for desktop and mobile",
      "Implemented animation, and modern UI/UX practices",
      "Contributed to the digital identity of IET Lucknow’s flagship fest",
    ],
  }
  ,
  {
    id: 4,
    title: "PassOp — Password Manager Web App",
    category: "web",
    description:
      "A simple yet effective password manager that allows users to securely save credentials with URLs for quick access.",
    longDescription:
      "PassOp is a lightweight and responsive password manager built with React and Tailwind CSS. It allows users to store credentials along with associated app URLs for easy access and organization. Data is stored in localStorage for simplicity and speed, with MongoDB integration for future scalability. Designed with clean UI and focus on usability, it's perfect for personal use and beginners exploring secure app workflows.",
    technologies: ["React", "Tailwind CSS", "MongoDB", "Vite", "LocalStorage"],
    imageUrl: "/PassOP.png", 
    demoUrl: "https://passop-eta.vercel.app",
    githubUrl: "https://github.com/ItsAbhishekkashyap", 
    color: "from-green-500 to-cyan-500",
    featured: false,
    completed: "2024",
    teamSize: 1,
    difficulty: 3,
    achievements: [
      "Built a responsive password manager from scratch using React",
      "Implemented localStorage-based data persistence for fast and offline-friendly experience",
      "Added support for URL-password association for better context",
      "Designed an intuitive and minimal UI using Tailwind CSS",
    ],
  },
  
  {
    id: 5,
    title: "DevLog — Full-Stack Blog Platform",
    category: "web",
    description:
      "A full-stack blogging platform where users can register, log in, and publish their own blogs in a clean, modern interface.",
    longDescription:
      "DevLog is a dynamic full-stack blog application built for developers and writers to share content easily. Users can register, log in, and manage their blog posts securely. The platform supports markdown formatting, displays all public blogs in a feed, and is styled with Tailwind CSS for a sleek, responsive design. Backend is powered by Node.js and MongoDB, ensuring a robust and scalable structure.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    imageUrl: "/blog.png", 
    demoUrl: "/https://github.com/ItsAbhishekkashyap", 
    githubUrl: "https://github.com/ItsAbhishekkashyap", 
    color: "from-gray-700 to-purple-600",
    featured: true,
    completed: "2024",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Built a secure authentication system using JWT",
      "Implemented full CRUD functionality for blogs",
      "Designed a responsive and modern UI using Tailwind CSS",
      "Enabled markdown support for flexible content creation",
      "Created a user-friendly interface for managing posts",
    ],
  },
  
  {
    id: 6,
    title: "GetMeAChai — Creator Support Platform",
    category: "web",
    description:
      "A creator support platform where users can sign up, log in, and send demo payments to creators as a token of appreciation.",
    longDescription:
      "GetMeAChai is a full-stack demo web app inspired by platforms like BuyMeACoffee, built using Next.js and Tailwind CSS. It allows users to log in, visit a creator's page, and send them a chai (payment) as a form of support. Though payment integration uses demo Razorpay routes, it showcases a real-world UI flow with working authentication, dynamic routing, and user dashboards. Built to demonstrate modern web dev skills in handling routes, sessions, and user actions.",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Razorpay (Demo)", "NextAuth"],
    imageUrl: "/chai.png", // replace with actual screenshot path
    demoUrl: "#", // if hosted in future, replace here
    githubUrl: "https://github.com/ItsAbhishekkashyap/get-me-a-chai",
    color: "from-yellow-400 to-rose-500",
    featured: false,
    completed: "2024",
    teamSize: 1,
    difficulty: 4,
    achievements: [
      "Implemented user registration and login with NextAuth",
      "Created dynamic user pages with custom route handling",
      "Built a dashboard for creators to manage contributions",
      "Integrated demo Razorpay payment flow for simulations",
      "Structured project using clean, modular Next.js app routing",
    ],
  },




  
  
  // {
  //   id: 6,
  //   title: "NYC Education Analytics",
  //   category: "data",
  //   description: "Data analysis and visualization platform for NYC public school performance metrics.",
  //   longDescription:
  //     "A comprehensive data analysis platform that processes and visualizes performance metrics from NYC public schools. The system includes predictive models for identifying at-risk students and schools that need additional resources.",
  //   technologies: ["Python", "Pandas", "Scikit-learn", "Tableau", "R"],
  //   imageUrl: "/placeholder.svg?height=600&width=800",
  //   demoUrl: "#",
  //   githubUrl: "https://github.com/swilliams9772",
  //   color: "from-indigo-600 to-blue-600",
  //   featured: false,
  //   completed: "2022",
  //   teamSize: 4,
  //   difficulty: 4,
  //   achievements: [
  //     "Analyzed NYC public school data to identify performance patterns",
  //     "Built predictive models for student success with Scikit-learn",
  //     "Created interactive visualizations with Tableau",
  //     "Presented findings to education stakeholders",
  //   ],
  // },
]

export default function RedesignedProjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const isClient = useIsClient()

  // Get featured projects
  const featuredProjects = projects.filter((project) => project.featured)

  // Filter projects based on category
  const filteredProjects =
    selectedCategory === "all"
      ? projects.filter((project) => !project.featured)
      : projects.filter((project) => project.category === selectedCategory && !project.featured)

  const handleNext = () => {
    if (!isClient) return
    setDirection(1)
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredProjects.length)
  }

  const handlePrev = () => {
    if (!isClient) return
    setDirection(-1)
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const handleDemoClick = (url: string) => {
    if (!isClient) return
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Simulate loading delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isClient])

  // If not client-side yet, show a loading state
  if (!isClient || isLoading) {
    return (
      <SectionContainer id="projects" className="relative">
        <SectionHeader
          title="Project Portfolio"
          subtitle="Explore my portfolio of Web Development projects."
        />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer id="projects" className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="Project Portfolio"
        subtitle="Explore my portfolio of Web development projects. Each project demonstrates different skills and technologies."
      />

      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center">
              <Layers className="h-5 w-5 text-primary" />
              <span>Featured Projects</span>
            </h3>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative rounded-xl overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={featuredProjects[currentFeaturedIndex].id}
                  custom={direction}
                  initial={{
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  exit={{
                    x: direction > 0 ? -1000 : 1000,
                    opacity: 0,
                    transition: {
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  className="relative w-full aspect-[16/9]"
                >
                  <div className="absolute inset-0 flex flex-col md:flex-row">
                    <div className="relative w-full h-48 md:h-auto md:w-1/2">
                      <Image
                        src={featuredProjects[currentFeaturedIndex].imageUrl || "/placeholder.svg"}
                        alt={featuredProjects[currentFeaturedIndex].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div
                      className={cn(
                        "w-full md:w-1/2 p-6 flex flex-col justify-center opacity-90 bg-gradient-to-r",
                        featuredProjects[currentFeaturedIndex].color,
                      )}
                    >
                      <Badge
                        variant="outline"
                        className="w-fit mb-4 bg-black/50 backdrop-blur-sm text-white border-white/20"
                      >
                        Featured Project
                      </Badge>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                        {featuredProjects[currentFeaturedIndex].title}
                      </h3>
                      <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        {featuredProjects[currentFeaturedIndex].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                        {featuredProjects[currentFeaturedIndex].technologies.slice(0, 3).map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {featuredProjects[currentFeaturedIndex].technologies.length > 3 && (
                          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
                            +{featuredProjects[currentFeaturedIndex].technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          className="bg-white text-black hover:bg-white/90 group text-sm"
                          onClick={() => handleDemoClick(featuredProjects[currentFeaturedIndex].demoUrl)}
                        >
                          Live Demo
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          asChild
                        >
                          <a
                            href={featuredProjects[currentFeaturedIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4" />
                            View Code
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          className="border-white text-white hover:bg-white/20 gap-2 text-sm"
                          onClick={() => {
                            setSelectedProject(featuredProjects[currentFeaturedIndex])
                            setIsDialogOpen(true)
                          }}
                        >
                          <Code className="h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Progress dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentFeaturedIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
                    )}
                    onClick={() => {
                      setDirection(index > currentFeaturedIndex ? 1 : -1)
                      setCurrentFeaturedIndex(index)
                    }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      )}

      <ScrollReveal>
        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full">
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-start gap-2 mb-8 bg-transparent w-max mx-auto">
              {projectCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all data-[state=active]:shadow-lg whitespace-nowrap",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {category.icon && category.icon}
                    <span>{category.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ErrorBoundary key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={() => {
                        setSelectedProject(project)
                        setIsDialogOpen(true)
                      }}
                    />
                  </motion.div>
                </ErrorBoundary>
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </ScrollReveal>

      {/* Project details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 w-[95vw]">
          {selectedProject && (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">
                      {selectedProject.category === "ai"
                        ? "AI & Machine Learning"
                        : selectedProject.category === "web"
                          ? "Web Development"
                          : selectedProject.category === "data"
                            ? "Data Science"
                            : selectedProject.category === "audio"
                              ? "Audio & Voice Tech"
                              : "Research"}
                    </Badge>
                    <DialogTitle className="text-xl sm:text-2xl">{selectedProject.title}</DialogTitle>
                    <DialogDescription className="mt-2 text-sm">{selectedProject.description}</DialogDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6 border-b">
                  <TabsList className="justify-start rounded-none bg-transparent h-10">
                    <TabsTrigger value="overview" className="text-sm">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="text-sm">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm">
                      Gallery
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-3">Project Details</h4>
                        <p className="mb-6 text-sm sm:text-base">{selectedProject.longDescription}</p>

                        <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-primary">✓</span>
                              </div>
                              <span className="text-sm sm:text-base">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          <Button
                            variant="default"
                            className="gap-2"
                            onClick={() => handleDemoClick(selectedProject.demoUrl)}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </Button>
                          <Button variant="outline" className="gap-2" asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              GitHub
                            </a>
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-3">Project Info</h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Completed</span>
                            <span>{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Team Size</span>
                            <span>{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Difficulty</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProject.imageUrl || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Project Description</h4>
                        <p className="text-sm sm:text-base">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Implementation Details</h4>
                        <p className="text-sm sm:text-base">
                          This project was implemented using {selectedProject.technologies.join(", ")}. The development
                          process involved careful planning, iterative development, and rigorous testing to ensure
                          high-quality results.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Challenges & Solutions</h4>
                        <p className="text-sm sm:text-base">
                          During development, we encountered several challenges including performance optimization,
                          scalability concerns, and integration complexities. These were addressed through innovative
                          approaches and best practices in software engineering.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="overflow-hidden rounded-lg">
                          <Image
                            src={`/placeholder.svg?height=400&width=600&text=Screenshot ${index}`}
                            alt={`${selectedProject.title} screenshot ${index}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionContainer>

    
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  onSelect: () => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isClient = useIsClient()

  return (
    <Card
      className="overflow-hidden h-full flex flex-col border-none shadow-md hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl || "/placeholder.svg"}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isClient && isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300 bg-gradient-to-r",
            project.color,
          )}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={onSelect}>
            View Details
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-xs">
            {project.category === "ai"
              ? "AI & ML"
              : project.category === "web"
                ? "Web Dev"
                : project.category === "data"
                  ? "Data Science"
                  : project.category === "audio"
                    ? "Audio"
                    : "Research"}
          </Badge>
          <div className="flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
              />
            ))}
          </div>
        </div>

        <h3 className="font-bold mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{project.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Team: {project.teamSize}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

