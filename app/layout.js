import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./globals.css";

const cascadiacode = localFont({
  src: [
    {
      path: '../public/fonts/CascadiaCode.ttf',
      weight: '300'
    }
  ],
  variable: '--font-cascadiacode'
})

export const metadata = {
  title: "Enoch Luu | Computer Science Graduate | Portfolio, Resume, LinkedIn",
  description: "Welcome to the personal website of Enoch Luu, a Computer Science graduate from UNSW Sydney. Explore my portfolio, view my resume, and connect with me on LinkedIn. Discover my projects, skills, and professional journey.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/icon.png" type="image/png" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://www.enochluu.com" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
      </head>
      <body className={cascadiacode.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
