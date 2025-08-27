import React from "react"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-posts"
import { Badge } from "@/components/ui/badge"

function findPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug)
  if (!post) return notFound()

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
          </div>
          <Badge variant="secondary">{post.category}</Badge>
        </div>

        {post.image && <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "" }} />
      </article>
    </main>
  )
}
