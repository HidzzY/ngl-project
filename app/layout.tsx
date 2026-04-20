import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NGL Clone - Anonymous',
  description: 'Send me secret messages!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#191919]">{children}</body>
    </html>
  )
}