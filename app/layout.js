import { SpeedInsights } from "@vercel/speed-insights/next"
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
  title: "Enoch Luu",
  description: "My personal website",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={cascadiacode.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
