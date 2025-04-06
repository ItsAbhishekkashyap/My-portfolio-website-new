"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Code,
  Cpu,
  Cloud,
  BookOpen,
  PenToolIcon as Tool,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const skillCategories = [
  {
    icon: <Code className="h-6 w-6" />,
    title: "Frontend Development",
    skills: [
      { name: "HTML", level: "Expert", years: 4 },
      { name: "CSS", level: "Expert", years: 4 },
      { name: "Tailwind CSS", level: "Advanced", years: 2 },
      { name: "JavaScript", level: "Expert", years: 4 },
      { name: "React.js", level: "Expert", years: 3 },
      { name: "Next.js", level: "Advanced", years: 2 },
    ],
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: "Intermediate", years: 1.5 },
      { name: "Express.js", level: "Intermediate", years: 1.5 },
      { name: "MongoDB", level: "Intermediate", years: 1.5 },
      { name: "MySQL", level: "Intermediate", years: 1 },
      { name: "REST APIs", level: "Advanced", years: 2 },
    ],
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Cloud & DevOps",
    skills: [
      { name: "Vercel", level: "Advanced", years: 2 },
      { name: "Firebase", level: "Intermediate", years: 1 },
      { name: "Git/GitHub", level: "Expert", years: 3 },
    ],
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learning & Exploration",
    skills: [
      { name: "Three.js", level: "Beginner", years: 0.2 },
      { name: "Figma", level: "Beginner", years: 0.2 },
    ],
  },
  {
    icon: <Tool className="h-6 w-6" />,
    title: "Additional Tools",
    skills: [
      { name: "Canva", level: "Advanced", years: 2 },
      { name: "VS Code", level: "Expert", years: 4 },
    ],
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Soft Skills",
    skills: [
      { name: "Public Speaking", level: "Advanced", years: 2 },
      { name: "Team Collaboration", level: "Advanced", years: 3 },
      { name: "Problem Solving", level: "Expert", years: 4 },
      { name: "Time Management", level: "Advanced", years: 3 },
    ],
  },
]

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="skills" className="py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-4">My Technical Stack</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          These are the core technologies and tools I've been working with in web development.
        </p>
      </motion.div>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search skills... (Ctrl+K)"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const filteredSkills = category.skills.filter((skill) =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )

          if (filteredSkills.length === 0) return null

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 border rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {filteredSkills.map((skill, i) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="px-3 py-1 rounded-full text-sm bg-muted cursor-default hover:bg-muted/80"
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {skill.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Level: {skill.level} | Experience: {skill.years} {skill.years > 1 ? "years" : "year"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

