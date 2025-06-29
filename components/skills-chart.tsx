"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

interface SkillLevel {
  area: string
  value: number
  fullMark: number
}

interface SkillGroup {
  name: string
  skills: SkillLevel[]
  color: string
}

const skillsData: SkillGroup[] = [
  {
    name: "Frontend",
    color: "#3b82f6",
    skills: [
      { area: "HTML", value: 95, fullMark: 100 },
      { area: "CSS", value: 90, fullMark: 100 },
      { area: "JavaScript", value: 92, fullMark: 100 },
      { area: "React.js", value: 88, fullMark: 100 },
      { area: "Next.js", value: 85, fullMark: 100 },
      { area: "Tailwind CSS", value: 93, fullMark: 100 },
    ],
  },
  {
    name: "Backend",
    color: "#10b981",
    skills: [
      { area: "Node.js", value: 85, fullMark: 100 },
      { area: "Express.js", value: 82, fullMark: 100 },
      { area: "MongoDB", value: 88, fullMark: 100 },
      { area: "PostgreSQL", value: 70, fullMark: 100 },
      { area: "JWT/Auth", value: 80, fullMark: 100 },
      { area: "API Design", value: 85, fullMark: 100 },
    ],
  },
  {
    name: "Dev Tools",
    color: "#f59e0b",
    skills: [
      { area: "Git/GitHub", value: 90, fullMark: 100 },
      { area: "Vercel", value: 88, fullMark: 100 },
      { area: "VS Code", value: 95, fullMark: 100 },
      { area: "Postman", value: 85, fullMark: 100 },
      { area: "Figma", value: 60, fullMark: 100 },
      { area: "Canva", value: 90, fullMark: 100 },
    ],
  },
  {
    name: "AI/ML & Others",
    color: "#8b5cf6",
    skills: [
      { area: "Python", value: 85, fullMark: 100 },
      { area: "Machine Learning", value: 70, fullMark: 100 },
      { area: "C++", value: 78, fullMark: 100 },
      { area: "DSA", value: 80, fullMark: 100 },
      { area: "Public Speaking", value: 75, fullMark: 100 },
      { area: "Design Thinking", value: 70, fullMark: 100 },
    ],
  },
]

export default function SkillsChart() {
  const [selectedSkillGroup, setSelectedSkillGroup] = useState<SkillGroup>(skillsData[0])
  const [isInView, setIsInView] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm p-2 rounded-md border shadow-md">
          <p className="font-medium">{payload[0].payload.area}</p>
          <p className="text-primary">{`Proficiency: ${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div ref={chartRef} className="w-full">
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {skillsData.map((group) => (
          <motion.button
            key={group.name}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedSkillGroup.name === group.name
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted hover:bg-muted/80",
            )}
            onClick={() => setSelectedSkillGroup(group)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {group.name}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSkillGroup.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full aspect-square max-w-xl mx-auto"
        >
          <Card className="w-full h-full bg-card/50 border-none overflow-hidden backdrop-blur-sm">
            <CardContent className="p-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedSkillGroup.skills}>
                  <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
                  <PolarAngleAxis
                    dataKey="area"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    stroke="rgba(255, 255, 255, 0.15)"
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.15)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Radar
                    name="Skill Level"
                    dataKey="value"
                    stroke={selectedSkillGroup.color}
                    fill={selectedSkillGroup.color}
                    fillOpacity={0.5}
                    animationDuration={isInView ? 1500 : 0}
                    animationEasing="ease-out"
                    isAnimationActive={isInView}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="max-w-xl mx-auto mt-4 text-center text-sm text-muted-foreground">
        Click on a category to view different skill groups. Hover over the chart for specific proficiency levels.
      </div>
    </div>
  )
}

