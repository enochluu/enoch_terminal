import localFont from "next/font/local";
import "./globals.css";

const cascadiacode = localFont({
  src: [
    {
      path: "../public/fonts/CascadiaCode-Light.woff2",
      weight: "300",
    },
  ],
  variable: "--font-cascadiacode",
  display: "block",
});

export const metadata = {
  title: "Enoch Luu | Cyber Security Technician | Skills, Resume, LinkedIn",
  description:
    "Welcome to the personal website of Enoch Luu, a Computer Science graduate from UNSW Sydney. Explore my web portfolio, view my resume, and connect with me on LinkedIn. Discover my projects, skills, and professional journey.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Enoch Luu | Cyber Security Technician | Skills, Resume, LinkedIn",
    description:
      "Welcome to the personal website of Enoch Luu, a Computer Science graduate from UNSW Sydney. Explore my web portfolio, view my resume, and connect with me on LinkedIn. Discover my projects, skills, and professional journey.",
    url: "https://www.enochluu.com",
  },
  twitter: {
    title: "Enoch Luu | Cyber Security Technician | Skills, Resume, LinkedIn",
    description:
      "Welcome to the personal website of Enoch Luu, a Computer Science graduate from UNSW Sydney. Explore my web portfolio, view my resume, and connect with me on LinkedIn. Discover my projects, skills, and professional journey.",
    card: "summary",
  },
    alternates: {
    canonical: "https://www.enochluu.com",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cascadiacode.className}>{children}</body>
    </html>
  );
}