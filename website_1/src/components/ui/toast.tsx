"use client"

import { Toaster, toast } from "react-hot-toast"
import type React from "react"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4500,
          style: {
            borderRadius: '10px',
            padding: '12px 16px',
          },
        }}
      />
      {children}
    </>
  )
}

export function useToast() {
  return {
    push: ({ title, message }: { title: string; message?: string }) => {
      if (message) toast.success(`${title} — ${message}`)
      else toast.success(title)
    },
    error: (msg: string) => toast.error(msg),
  }
}
