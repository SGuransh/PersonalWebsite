import fs from "fs"
import path from "path"

export type BlogPost = {
  title: string
  excerpt: string
  image?: string
  date: string
  readTime?: string
  // category can be a single string or multiple categories
  category?: string | string[]
  slug: string
  // path to the file that contains the full HTML/MD content, relative to repo root
  contentFile?: string
  // populated when content is loaded
  content?: string
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable React Applications with Next.js 14",
    excerpt:
      "Explore the latest features in Next.js 14 and learn how to build performant, scalable React applications with the new App Router.",
    image: "/next-js-development-code-editor.png",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    slug: "building-scalable-react-applications-nextjs-14",
  contentFile: "src/content/posts/building-scalable-react-applications-nextjs-14.html",
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
  contentFile: "src/content/posts/art-of-api-design-restful-services.html",
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
  contentFile: "src/content/posts/modern-css-techniques-better-ui.html",
  },
]

// export const blogPosts: BlogPost[] = []

export type PaginatedPosts = {
  posts: BlogPost[]
  page: number
  perPage: number
  total: number
  totalPages: number
}

export function getAllPosts(): BlogPost[] {
  // return posts sorted by date desc
  return [...blogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function searchPosts(query?: string): BlogPost[] {
  // only search title, excerpt and category to avoid loading all contents
  if (!query) return getAllPosts()
  const q = query.toLowerCase()
  return getAllPosts().filter((p) => {
    const categories = Array.isArray(p.category) ? p.category.join(" ") : p.category || ""
    const hay = `${p.title} ${p.excerpt} ${categories}`.toLowerCase()
    return hay.includes(q)
  })
}

export function paginatePosts(page = 1, perPage = 10, query?: string, category?: string): PaginatedPosts {
  let all = searchPosts(query)
  if (category) {
    all = all.filter((p) => {
      if (!p.category) return false
      if (Array.isArray(p.category)) return p.category.includes(category)
      return p.category === category
    })
  }
  const total = all.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const p = Number.isFinite(page) && page >= 1 ? Math.min(Math.max(1, page), totalPages) : 1
  const start = (p - 1) * perPage
  const posts = all.slice(start, start + perPage)
  return { posts, page: p, perPage, total, totalPages }
}

export function getTotalPages(perPage = 10, query?: string) {
  return Math.max(1, Math.ceil(searchPosts(query).length / perPage))
}

export function getCategories(): string[] {
  const cats = getAllPosts()
    .map((p) => p.category)
    .filter(Boolean)
    .flatMap((c) => (Array.isArray(c) ? c : [c])) as string[]
  return Array.from(new Set(cats))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostWithContent(slug: string): BlogPost | undefined {
  const post = getPostBySlug(slug)
  if (!post) return undefined
  if (post.contentFile) {
    try {
      const filePath = path.resolve(process.cwd(), post.contentFile)
      if (fs.existsSync(filePath)) {
        post.content = fs.readFileSync(filePath, "utf8")
      } else {
        post.content = ""
      }
    } catch (e) {
      post.content = ""
    }
  }
  return post
}
