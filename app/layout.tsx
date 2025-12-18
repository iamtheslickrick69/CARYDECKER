import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cbsc.com'),
  title: 'CBSC - Custom Branded Screen Cleaners',
  description: 'Premium custom branded screen cleaners. NASA-inspired technology that sticks to devices and delivers 100+ brand impressions. Founded by the original inventor.',
  openGraph: {
    title: 'CBSC - Custom Branded Screen Cleaners',
    description: 'Your brand, their screens, always clean. Premium promotional products with NASA-inspired technology.',
    images: ['/images/logoofficial.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBSC - Custom Branded Screen Cleaners',
    description: 'Your brand, their screens, always clean. Premium promotional products with NASA-inspired technology.',
    images: ['/images/logoofficial.png'],
  },
  icons: {
    icon: [
      {
        url: '/cbsc-favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
