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
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}