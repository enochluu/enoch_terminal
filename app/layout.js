import localFont from '@next/font/local';
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cascadiacode.className}>{children}</body>
    </html>
  );
}
