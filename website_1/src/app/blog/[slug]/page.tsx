import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostWithContent } from "@/lib/blog-posts"
import { Badge } from "@/components/ui/badge"

type Props = {
  // Match Next's generated PageProps shape where params is a Promise
  params?: Promise<{ slug: string }> | undefined
}

export default async function PostPage({ params }: Props) {
  // params may be a Promise (or plain object) depending on Next's runtime — normalize with Promise.resolve
  const p = await Promise.resolve(params)
  if (!p || !p.slug) return notFound()

  const post = getPostWithContent(p.slug)
  if (!post) return notFound()

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article className="space-y-8">
        <div>
          <Link href="/blog" className="text-sm text-accent hover:underline">
            ← Back to posts
          </Link>
        </div>

        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{post.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              {post.readTime && <span>• {post.readTime}</span>}
            </div>
            <div className="mt-2 sm:mt-0">
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          </div>

          {post.excerpt && <p className="text-lg text-muted-foreground">{post.excerpt}</p>}
        </header>

        {post.image && (
          <figure className="overflow-hidden rounded-lg shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
          </figure>
        )}

        <section className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </section>
      </article>
    </main>
  )
}
