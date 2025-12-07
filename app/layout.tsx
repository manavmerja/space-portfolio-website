import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Font confirm kar lena
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// ✅ FINAL METADATA POLISH
export const metadata: Metadata = {
  title: "Manav Merja | Full Stack & ML Engineer",
  description: "Portfolio of Manav Merja - A Full Stack Developer & ML Engineer specializing in Next.js, AI/ML, and Building the Future. Explore my missions.",
  // ✅ FIX: Explicitly link the icon
  icons: {
    icon: "/logo.png", // Agar aap PNG use kar rahe hain
    // icon: "/favicon.ico", // Agar aap ICO file use kar rahe hain
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: ["Manav Merja", "Portfolio", "Full Stack Developer", "ML Engineer", "Next.js", "React", "AI"],
  authors: [{ name: "Manav Merja" }],
  openGraph: {
    title: "Manav Merja | The Portfolio",
    description: "Entering the orbit of a Full Stack & ML Engineer. View projects, skills, and AI assistant.",
    url: "https://my-portfolio-opal-tau-85.vercel.app/", // ⚠️ Yahan apni Live Link daalna
    siteName: "Manav Merja Portfolio",
    images: [
      {
        url: "/og-image.png", // (Optional) Ek screenshot leke public folder me daal dena
        width: 1200,
        height: 630,
        alt: "Manav Merja Portfolio",
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