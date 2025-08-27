import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, MapPin, Calendar } from "lucide-react"

export function ResumeSection() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description:
        "Led development of scalable web applications serving 100K+ users. Mentored junior developers and implemented CI/CD pipelines.",
      achievements: [
        "Reduced application load time by 40%",
        "Led team of 5 developers",
        "Implemented microservices architecture",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions LLC",
      location: "Austin, TX",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects using React, Node.js, and cloud technologies.",
      achievements: ["Delivered 15+ successful projects", "Improved code quality by 60%", "Integrated payment systems"],
    },
    {
      title: "Frontend Developer",
      company: "Creative Agency",
      location: "Remote",
      period: "2019 - 2020",
      description:
        "Created responsive web interfaces and collaborated with design teams to implement pixel-perfect designs.",
      achievements: ["Built 20+ responsive websites", "Improved accessibility scores", "Reduced bounce rate by 25%"],
    },
  ]

  const skills = [
    { name: "JavaScript/TypeScript", level: 95 },
    { name: "React/Next.js", level: 90 },
    { name: "Node.js/Express", level: 85 },
    { name: "Python/Django", level: 80 },
    { name: "PostgreSQL/MongoDB", level: 85 },
    { name: "AWS/Docker", level: 75 },
  ]

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      gpa: "3.8/4.0",
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
            <a href="/resume.pdf" download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
