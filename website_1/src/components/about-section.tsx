import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Zap } from "lucide-react"

export function AboutSection() {
  const skills = [
    "Python",
    "Java",
    "C/C++",
    "TypeScript",
    "SQL",
    "MIPS Assembly",
    "AWS",
    "Azure",
    "Terraform",
    "Docker",
    "React/Next.js",
    "Pandas/Numpy",
  ]

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern technologies and best practices.",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Creating data intensive applications with cloud",
    },
    {
      icon: Zap,
      title: "Distributed Systems",
      description: "Optimizing applications for speed, reliability and scalability.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            I'm Guransh Singh, a Computer Science Specialist at the University of Toronto with practical experience
            building cloud-native systems, backend services, and full-stack applications. I am aiming to specialize in databases,
            distributed systems, and cloud computing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <highlight.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground text-pretty">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
