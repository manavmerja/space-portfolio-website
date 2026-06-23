"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Navbar as NavbarLayout,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/navigation/resizable-navbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ LINKS CONFIGURATION (Contact Me is now a regular link)
  const navItems = [
    { name: "About", link: "#about" },       // About Section
    { name: "Tech Stack", link: "#stack" },  // Tech Stack Section
    { name: "Projects", link: "#projects" }, // Projects Section
    { name: "Timeline", link: "#journey" },   // Journey Section
    { name: "Resume", link: "/resume.pdf" }, // Resume File
    { name: "Contact Me", link: "#contact" }, // Contact Section
  ];

  return (
    <NavbarLayout className="mt-2">
      
      {/* --- DESKTOP NAVBAR --- */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        {/* Highlighted Blog Button */}
        <NavbarButton 
          href="/blog" 
          variant="primary" 
          className="px-6 py-2.5 text-xs md:text-sm font-extrabold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
        >
          My Blog&apos;s
        </NavbarButton>
      </NavBody>

      {/* --- MOBILE NAVBAR --- */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
           <Link
              key={idx}
              href={item.link}
              target={item.name === "Resume" ? "_blank" : undefined} // Resume in new tab
              onClick={() => setIsOpen(false)} // Close menu on click
              className="block w-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {/* Highlighted Mobile Blog Button */}
          <NavbarButton 
            href="/blog" 
            className="w-full mt-4 py-3 text-sm font-extrabold tracking-widest uppercase"
          >
            My Blog&apos;s
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
      
    </NavbarLayout>
  );
}