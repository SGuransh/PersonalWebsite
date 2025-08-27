export type BlogPost = {
  title: string
  excerpt: string
  image?: string
  date: string
  readTime?: string
  category?: string
  slug: string
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
    content: `
<h2>Building Scalable React Applications with Next.js 14</h2>
<p>Next.js 14 introduces several powerful features. Replace this with your full post content.</p>
`,
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
    content: `
<h2>The Art of API Design: Best Practices for RESTful Services</h2>
<p>API design is about empathy. Replace this with your full post content.</p>
`,
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
    content: `
<h2>Modern CSS Techniques for Better User Interfaces</h2>
<p>CSS has evolved. Replace this with your full post content.</p>
`,
  },
]
