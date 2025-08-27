import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MapPin, Calendar } from "lucide-react"

export function ResumeSection() {
  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Mackenzie Investments",
      location: "Toronto, Ontario",
      period: "September 2025 - Present",
      description: "Scheduled to work with Python, Django, Pandas, Numpy, Scipy, Quantpy, SQL",
      achievements: [],
    },
    {
      title: "Software Developer Intern",
      company: "CGI - BMO",
      location: "Toronto, Ontario",
      period: "June 2025 - August 2025",
      description: "Developed and maintained backend services using TypeScript on AWS Lambda.",
      achievements: ["Delivered over 20+ pull requests", "Prototyped an agentic AI system using LangChain and LangGraph"],
    },
    {
      title: "Software Engineer",
      company: "Sikh Sparks (Volunteer)",
      location: "Toronto, Ontario",
      period: "December 2024 - May 2025",
      description: "Developed scalable REST APIs with Java Spring Boot and managed cloud infra on Azure using Terraform.",
      achievements: ["Implemented Google OAuth via Keycloak", "Dockerized microservices for scalable deployments"],
    },
    {
      title: "Software Engineer",
      company: "Alfina Technology (Part-Time)",
      location: "Toronto, Ontario",
      period: "January 2025 - April 2025",
      description: "Led a team to design and build a web & mobile app using Next.js, React, and TypeScript.",
      achievements: ["Built Python/Polars backend to compute HHI for market concentration (75% improvement)", "Implemented OAuth + Firebase session persistence via HTTP-only cookies"],
    },
    {
      title: "Software Developer Intern",
      company: "CGI - CIBC",
      location: "Toronto, Ontario",
      period: "May 2024 - September 2024",
      description: "Contributed to Node.js microservices and built a monitoring tool with Prometheus/Grafana.",
      achievements: ["Created Python POC simulator to automate test data (40% test speedup)", "Contributed 25+ PRs"],
    },
    {
      title: "Software Developer Intern",
      company: "CGI - CIBC",
      location: "Toronto, Ontario",
      period: "May 2023 - September 2023",
      description: "Devised and implemented large-scale data processing pipelines in Python, reducing analysis time by over 99%.",
      achievements: ["Designed an ID management system to optimize script workflows", "Collaborated on audit prep ensuring 100% compliance"],
    },
  ]

  const skills = [
    { name: "Python", level: 95 },
    { name: "Java", level: 85 },
    { name: "TypeScript", level: 90 },
    { name: "AWS / Azure / Terraform", level: 85 },
    { name: "Docker / Kubernetes", level: 80 },
    { name: "SQL / Databases", level: 85 },
  ]

  const education = [
    {
      degree: "Computer Science Specialist, Stats Minor",
      school: "University of Toronto",
      period: "Sep. 2022 - Present",
      gpa: "3x Dean's List Scholar",
    },
  ]

  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Resume</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            My professional journey and technical expertise in building digital solutions.
          </p>
          <Button size="lg" className="gap-2" asChild>
              <a href="/Resume_Guransh_Singh.pdf" download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

  <div className="grid lg:grid-cols-1 gap-8">
          {/* Experience */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span>{exp.title}</span>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                      </div>
                    </CardTitle>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-pretty">{exp.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted-foreground">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Education */}
            <h3 className="text-2xl font-semibold mb-6 mt-12">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span>{edu.degree}</span>
                      <div className="flex items-center text-sm text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {edu.period}
                        </div>
                      </div>
                    </CardTitle>
                    <p className="text-accent font-medium">{edu.school}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">GPA: {edu.gpa}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technical skills removed by user request */}
        </div>
      </div>
    </section>
  )
}
