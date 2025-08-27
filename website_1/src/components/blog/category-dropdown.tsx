"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Props = {
  categories: string[]
  current?: string
  q?: string | undefined
}

export default function CategoryDropdown({ categories, current, q }: Props) {
  const router = useRouter()

  function selectCategory(cat: string) {
    // update hidden input if present (so the search form still works)
    try {
      const input = document.getElementById("category-input") as HTMLInputElement | null
      if (input) input.value = cat
    } catch (e) {
      // ignore
    }

    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (cat) params.set("category", cat)
    const query = params.toString()
    router.push(`/blog${query ? `?${query}` : ""}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-12 px-4 rounded-md border-2 border-indigo-200 bg-white">
        {current && current !== "" ? current : "All"}
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={6}>
        <DropdownMenuItem onSelect={() => selectCategory("")}>All</DropdownMenuItem>
        <DropdownMenuSeparator />
        {categories.map((c) => (
          <DropdownMenuItem key={c} onSelect={() => selectCategory(c)}>
            {c}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
