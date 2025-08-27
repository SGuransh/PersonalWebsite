import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export function BlogSection() {
  const blogPosts = [
    {
      title: "Building Scalable React Applications with Next.js 14",
      excerpt:
        "Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router.",
      image: "/next-js-development-code-editor.png",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Development",
      slug: "building-scalable-react-applications-nextjs-14",
    },
    {
      title: "The Art of API Design: Best Practices for RESTful Services",
      excerpt:
        "Learn the fundamental principles of designing clean, maintainable, and scalable RESTful APIs that developers love to use.",
      image: "/api-development-rest-endpoints.png",
      date: "2024-01-08",
      readTime: "12 min read",
      category: "Backend",
      slug: "art-of-api-design-restful-services",
    },
    {
      title: "Modern CSS Techniques for Better User Interfaces",
      excerpt:
        "Discover advanced CSS techniques including Grid, Flexbox, and custom properties to create stunning user interfaces.",
      image: "/modern-css-grid-layout-design.png",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Design",
      slug: "modern-css-techniques-better-ui",
    },
  ]

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Latest Blog Posts</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Sharing insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-accent transition-colors">{post.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-pretty">{post.excerpt}</p>
                <Button variant="ghost" className="p-0 h-auto font-medium group/btn">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
