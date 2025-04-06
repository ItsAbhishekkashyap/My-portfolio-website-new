// import type React from "react"
// import { BookOpen, GraduationCap, Trophy, CheckCircle } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// export default function Education() {
//   return (
//     <section id="education" className="py-12">
//       <h2 className="text-3xl font-bold text-center mb-12">Education</h2>

//       <Card className="bg-gradient-to-r from-indigo-950 to-purple-950 border-none">
//         <CardHeader className="pb-2">
//           <div className="flex items-center gap-2">
//             <GraduationCap className="h-5 w-5" />
//             <CardTitle>Electronics and Communication Engineering</CardTitle>
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <div className="text-muted-foreground">Institute of Engineering & Technology, Lucknow</div>
//             <div>2023 - 2027</div>
//           </div>
//           <div className="text-muted-foreground">Lucknow, India</div>
//           <div className="text-muted-foreground">YGPA: 8.53 (First Year)</div>
//           <div className="text-muted-foreground mt-1">
//             Relevant Coursework: Digital Electronics, Signal Systems, Programming in C/C++, Data Structures and Algorithms, Web Development, Engineering Mathematics.
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid md:grid-cols-2 gap-8 mt-4">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Key Coursework</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <CourseItem name="Data Structures" grade="A" />
//                 <CourseItem name="C++ Programming" grade="A" />
//                 <CourseItem name="Digital Electronics" grade="A" />
//                 <CourseItem name="Signals & Systems" grade="A" />
//                 <CourseItem name="Mathematics II & III" grade="A" />
//                 <CourseItem name="Computer Architecture" grade="A" />
//                 <CourseItem name="Sensor & Instrumentation" grade="A" />
//                 <CourseItem name="Web Development (Self-learned)" grade="A+" />
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
//               <div className="space-y-6">
//                 <AchievementItem
//                   icon={<Trophy className="h-5 w-5" />}
//                   title="Encore Fest Website"
//                   description="Spearheaded the frontend development of Encore 2025's official website, showcasing events, team, and timeline for IET Lucknow’s biggest college fest."
//                 />

//                 <AchievementItem
//                   icon={<CheckCircle className="h-5 w-5" />}
//                   title="Full-Stack Projects"
//                   description="Developed multiple full-stack applications using MERN, Next.js, Tailwind, and Firebase."
//                 />
//                 <AchievementItem
//                   icon={<BookOpen className="h-5 w-5" />}
//                   title="Hackathon Participation"
//                   description="Participated in SIH and various internal hackathons with strong contributions in web and AI."
//                 />

//                 <AchievementItem
//                   icon={<Trophy className="h-5 w-5" />}
//                   title="Silver Medalist – Taekwondo"
//                   description="Secured Silver in Taekwondo at IIT BHU Zonal Tournament, representing IET Lucknow with pride and discipline."
//                 />

//               </div>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4">Skills Developed</h3>
//             <div className="space-y-4">
//               <SkillProgressItem name="Full-Stack Development" value={75} />
//               <SkillProgressItem name="Problem Solving (DSA)" value={70} />
//               <SkillProgressItem name="React & Next.js" value={85} />
//               <SkillProgressItem name="Database & API Handling" value={60} />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   )
// }

// interface CourseItemProps {
//   name: string
//   grade: string
// }

// function CourseItem({ name, grade }: CourseItemProps) {
//   return (
//     <div className="flex justify-between items-center">
//       <div>{name}</div>
//       <div className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
//         {grade}
//       </div>
//     </div>
//   )
// }

// interface AchievementItemProps {
//   icon: React.ReactNode
//   title: string
//   description: string
// }

// function AchievementItem({ icon, title, description }: AchievementItemProps) {
//   return (
//     <div className="bg-black/20 rounded-lg p-4">
//       <div className="flex items-center gap-2 mb-2">
//         {icon}
//         <h4 className="font-medium">{title}</h4>
//       </div>
//       <p className="text-sm text-muted-foreground">{description}</p>
//     </div>
//   )
// }

// interface SkillProgressItemProps {
//   name: string
//   value: number
// }

// function SkillProgressItem({ name, value }: SkillProgressItemProps) {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-1">
//         <div>{name}</div>
//         <div>{value}%</div>
//       </div>
//       <Progress value={value} className="h-2" />
//     </div>
//   )
// }



import type React from "react"
import {
  BookOpen,
  GraduationCap,
  Trophy,
  CheckCircle,
  Brain,
  Code2,
  LayoutPanelTop,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Education() {
  return (
    <section id="education" className="py-16 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center mb-16 text-primary">🎓 Education</h2>

      <Card className="bg-background border shadow-xl rounded-2xl transition-colors duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
              Electronics and Communication Engineering
            </CardTitle>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3 gap-1 text-sm text-muted-foreground">
            <span>Institute of Engineering & Technology, Lucknow</span>
            <span>📅 2023 - 2027</span>
          </div>
          <div className="text-muted-foreground text-sm">📍 Lucknow, India</div>
          <div className="text-muted-foreground text-sm">📘 YGPA: 8.53 (First Year)</div>
          <p className="text-muted-foreground text-sm mt-2">
            📚 <span className="font-medium">Relevant Coursework:</span> Digital Electronics, Signal Systems, Programming in C/C++, Data Structures and Algorithms, Web Development, Engineering Mathematics.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-10 mt-6">

            {/* Key Coursework */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Key Coursework
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <CourseItem name="Data Structures" grade="A" />
                <CourseItem name="C++ Programming" grade="A" />
                <CourseItem name="Digital Electronics" grade="A" />
                <CourseItem name="Signals & Systems" grade="A" />
                <CourseItem name="Mathematics IV" grade="A" />
                <CourseItem name="COA" grade="A" />
                <CourseItem name="Sensor " grade="A" />
                <CourseItem name="Web Dev" grade="A+" />
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5" /> Key Achievements
              </h3>
              <div className="space-y-4">
                <AchievementItem
                  icon={<LayoutPanelTop className="h-5 w-5 text-yellow-500" />}
                  title="Encore Fest Website"
                  description="Led the frontend development for Encore 2025’s official website at IET Lucknow."
                />
                <AchievementItem
                  icon={<Code2 className="h-5 w-5 text-green-500" />}
                  title="Full-Stack Projects"
                  description="Built projects using MERN, Next.js, Tailwind, Firebase, and Express.js."
                />
                <AchievementItem
                  icon={<Brain className="h-5 w-5 text-pink-500" />}
                  title="Hackathon Participation"
                  description="Contributed in SIH and internal hackathons with web & AI solutions."
                />
                <AchievementItem
                  icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
                  title="Silver – Taekwondo"
                  description="Won Silver at IIT BHU Zonal Tournament representing IET Lucknow."
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5" /> Skills Developed
            </h3>
            <div className="space-y-4">
              <SkillProgressItem name="Full-Stack Development" value={75} />
              <SkillProgressItem name="Problem Solving (DSA)" value={70} />
              <SkillProgressItem name="React & Next.js" value={85} />
              <SkillProgressItem name="Database & API Handling" value={60} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// ========== CourseItem ==========

interface CourseItemProps {
  name: string
  grade: string
}

function CourseItem({ name, grade }: CourseItemProps) {
  return (
    <div className="flex justify-between items-center bg-muted px-3 py-2 rounded-lg shadow-sm">
      <span className="text-foreground">{name}</span>
      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow">
        {grade}
      </span>
    </div>
  )
}

// ========== AchievementItem ==========

interface AchievementItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function AchievementItem({ icon, title, description }: AchievementItemProps) {
  return (
    <div className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h4 className="font-medium text-foreground">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

// ========== SkillProgressItem ==========

interface SkillProgressItemProps {
  name: string
  value: number
}

function SkillProgressItem({ name, value }: SkillProgressItemProps) {
  return (
    <div>
      <div className="flex justify-between items-center text-foreground text-sm mb-1">
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2 bg-muted" />
    </div>
  )
}



