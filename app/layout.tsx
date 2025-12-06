import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // ✅ New Font
import "./globals.css";

// Font Setup
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // Alag alag motai (thickness)
});

export const metadata: Metadata = {
  title: "Manav Merja | Full Stack & ML Engineer",
  description: "Portfolio of a Creative Developer exploring AI and the Web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* Body par font lagaya */}
      <body className={`${spaceGrotesk.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}