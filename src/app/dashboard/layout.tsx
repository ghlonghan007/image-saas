"use client";
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
const inter = Inter({ subsets: ['latin'] })
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
         <SessionProvider>
      <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  )
}
