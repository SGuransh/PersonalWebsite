import React from "react"
import Link from "next/link"
import { paginatePosts, getCategories } from "@/lib/blog-posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CategoryDropdown from "@/components/blog/category-dropdown"

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function BlogIndex({ searchParams }: Props) {
  // searchParams is a dynamic input; await it per Next.js guidance
  const sp = await Promise.resolve(searchParams)
  // read page and q from search params
  const pageParam = Array.isArray(sp?.page) ? sp.page[0] : sp?.page
  const qParam = Array.isArray(sp?.q) ? sp.q[0] : (sp?.q as string | undefined)
  const page = pageParam ? parseInt(pageParam as string, 10) || 1 : 1

  const categoryParam = Array.isArray(sp?.category) ? sp.category[0] : (sp?.category as string | undefined)
  const { posts, total, totalPages } = paginatePosts(page, 10, qParam, categoryParam)
  const categories = getCategories()

  const makeQuery = (pageNumber?: number) => {
    const parts: string[] = []
    if (typeof pageNumber === "number") parts.push(`page=${pageNumber}`)
    if (qParam) parts.push(`q=${encodeURIComponent(qParam)}`)
    if (categoryParam) parts.push(`category=${encodeURIComponent(categoryParam)}`)
    return parts.length ? `?${parts.join("&")}` : ""
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 relative">
        <div className="flex items-center justify-between">
          <div />
          <div className="text-center">
            <h1 className="text-4xl font-bold">Blog</h1>
            <p className="text-muted-foreground mt-2">All posts and articles</p>
          </div>
          <div className="text-right">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-center">
          <form method="get" className="flex items-center w-full md:w-2/3 gap-3">
            <input
              name="q"
              defaultValue={qParam || ""}
              placeholder="Search posts..."
              className="h-12 input w-full max-w-xl text-left px-4 rounded-md border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Search posts"
            />
            <input type="hidden" id="category-input" name="category" defaultValue={categoryParam || ""} />
            <CategoryDropdown categories={categories} current={categoryParam} q={qParam} />

            <Button size="lg" className="text-lg px-8 py-6">
              Search
            </Button>
          </form>
        </div>

        <div className="mt-3 text-center text-sm text-muted-foreground">{total} posts</div>
      </div>

      

      {posts.length === 0 ? (
        <div className="py-24 text-center">
          <h3 className="text-2xl font-semibold">No posts found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Card key={post.slug}>
              <Link href={`/blog/${post.slug}${qParam ? `?q=${encodeURIComponent(qParam)}` : ""}` }>
                <article className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {(Array.isArray(post.category) ? post.category : post.category ? [post.category] : []).map((c) => (
                        <Badge key={c} variant="secondary">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>
      )}

      <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
        <Link
          href={`/blog?page=${Math.max(1, page - 1)}${qParam ? `&q=${encodeURIComponent(qParam)}` : ""}`}
          className={`px-3 py-1 rounded border ${page <= 1 ? "opacity-50 pointer-events-none" : "hover:bg-muted"}`}
        >
          Previous
        </Link>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1
            return (
              <Link
                key={p}
                href={`/blog?page=${p}${qParam ? `&q=${encodeURIComponent(qParam)}` : ""}`}
                className={`px-3 py-1 rounded border ${p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {p}
              </Link>
            )
          })}
        </div>

        <Link
          href={`/blog?page=${Math.min(totalPages, page + 1)}${qParam ? `&q=${encodeURIComponent(qParam)}` : ""}`}
          className={`px-3 py-1 rounded border ${page >= totalPages ? "opacity-50 pointer-events-none" : "hover:bg-muted"}`}
        >
          Next
        </Link>
      </nav>
    </main>
  )
}
