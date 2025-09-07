"use client"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal, StaggeredContainer, StaggerItem } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Briefcase, GraduationCap, Heart, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutSection() {


  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Abhishek_Gond_Resume.pdf";
    link.download = "Abhishek_Gond_Resume.pdf";
    link.click();
  };
  return (
    <SectionContainer id="about" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="About Me"
        subtitle="Get to know more about my background, expertise, and what drives me to create innovative solutions."
      />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="relative">
            <div className="relative z-10 rounded-lg sm:w-[40vw] sm:h-[80vh] object-cover  overflow-hidden border border-white/10 shadow-xl">
              <Image
                src="/A3.png?height=400&width=400"
                alt="Abhishek Gond"
                width={400}
                height={400}
                className="w-auto sm:w-[40vw] sm:h-[80vh]  object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Add an overlay with a subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t w-[40vw] from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium">Abhishek Gond</p>
                  <p className="text-sm text-white/80">ECE Engineering student and Web developer</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary/50 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-lg -z-10" />

            {/* Stats cards */}

            <div className="flex flex-wrap gap-4">



            </div>

          </div>
        </ScrollReveal>

        <div>
          <StaggeredContainer>
            <StaggerItem>
              <h3 className="text-2xl font-bold mb-4">Electronics and Communication Engineering student | Driven by Curiosity, Powered by Code</h3>
            </StaggerItem>

            <StaggerItem>
              <p className="text-muted-foreground mb-6">
                I'am ECE Engineer and web developer with a passion for innovation and a knack for problem-solving.
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="text-muted-foreground mb-6">
                My journey in the world of technology has been driven by a deep curiosity for the ever-evolving digital landscape.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="px-3 py-1.5 bg-blue-500/20 text-blue-500 border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                  <Briefcase className="h-3.5 w-3.5 mr-1" />
                  Full Stack Development
                </Badge>
                <Badge className="px-3 py-1.5 bg-purple-500/20 text-purple-500 border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                  <GraduationCap className="h-3.5 w-3.5 mr-1" />
                  Public Speaking
                </Badge>
                <Badge className="px-3 py-1.5 bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30 transition-colors">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  Team Collaboration
                </Badge>
              </div>
            </StaggerItem>

            <StaggerItem>

              <Button onClick={handleDownload} className="gap-2 group shadow-lg hover:shadow-primary/20 transition-all duration-300">
                <Download className="h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
              <Button variant="outline" className="ml-3 hover:bg-blue-700 gap-2 group" asChild>
                <a
                  href="https://www.linkedin.com/in/abhishek-gond-054884256"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View LinkedIn</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" className="ml-3  hover:bg-green-700 gap-2 group" asChild>
                <a
                  href="https://www.fiverr.com/s/kLjBgzL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View Fiverr</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>


            </StaggerItem>

            <StaggerItem>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="absolute sm:mt-4 w-25 shadow-lg backdrop-blur-sm bg-background/80 border-white/10 rounded-lg overflow-hidden"
              >
                <div className="flex gap-2">


                  <Card className="border-none bg-transparent">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1">
                        <Award className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Experience in project</div>
                          <div className="text-2xl font-bold">2+ Years</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-transparent">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div className="">
                          <div className="text-sm font-medium">Projects</div>
                          <div className="text-2xl font-bold">10+</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </StaggerItem>

          </StaggeredContainer>
        </div>
      </div>
    </SectionContainer>
  )
}

