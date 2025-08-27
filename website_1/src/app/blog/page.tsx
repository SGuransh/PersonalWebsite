import React from "react"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogIndex() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-2">All posts and articles</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.slug} asChild>
            <Link href={`/blog/${post.slug}`}>
              <article className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                  </div>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </article>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  )
}
