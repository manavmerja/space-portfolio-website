import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  // ✅ FIX: Add this line (Apni Vercel link yahan dalein)
  metadataBase: new URL("https://my-portfolio-opal-tau-85.vercel.app"),

  title: "Manav Merja | Full Stack & ML Engineer",
  description: "Portfolio of Manav Merja...",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Manav Merja | The Portfolio",
    description: "Full Stack & ML Engineer Portfolio.",
    // ✅ Yahan ab full URL likhne ki zarurat nahi, bas slash laga do
    url: "/", 
    siteName: "Manav Merja Portfolio",
    images: [
      {
        url: "/logo.png", // Ye ab automatic 'metadataBase' se jud jayega
        width: 1200,
        height: 630,
        alt: "Manav Merja",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Figtree:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.className} font-figtree antialiased`}>{children}</body>
    </html>
  );
}