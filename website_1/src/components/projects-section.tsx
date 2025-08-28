import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "SikhiHub",
      description:
        "A full-stack platform for NGO to organize events and plan community gatherings.",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "TypeScript", "Java SpringBoot", "PostgreSQL", "Terraform", "Azure cloud", "SQL"],
      liveUrl: "https://sikhihub.com",
      featured: true,
    },
    {
      title: "Eventuary",
      description:
        "AWS hackathon winner, A full stack AWS based application targeted to student to get personalized suggestions and platform to register.",
      image: "/task-management-dashboard.png",
      technologies: ["React", "Node.js", "Python", "AWS", "Lambda", "Bedrock", "RDS"],
      liveUrl: "https://devpost.com/software/eventuary",
    },
    {
      title: "Law Ticketing System",
      description: "A real world law ticketing system, for ticket management and analytic dashboards.",
      image: "/weather-analytics-dashboard-with-charts.png",
      technologies: ["AWS", "Python", "Lambda", "SQL", "RDS", "Data Analysis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/username/project",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A showcase of my recent work, demonstrating various technologies and problem-solving approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 ${project.featured ? "md:col-span-2" : ""}`}
            >
              <div className={`${project.featured ? "md:flex" : ""}`}>
                <div className={`${project.featured ? "md:w-1/2" : ""}`}>
                  <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className={`${project.featured ? "md:w-1/2" : ""}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">View source</span>
                          </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View live site</span>
                          </a>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
