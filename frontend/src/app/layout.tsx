import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sustainable Navigation',
  description: 'Supporting sustainable navigation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <script
          async
          defer
          src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"
        ></script>
      </body>
    </html>
  )
}
