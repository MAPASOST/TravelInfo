import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flight Price Tracker',
  description: 'Track and predict flight prices to your favorite destinations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
