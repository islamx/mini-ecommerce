import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "Mini E-Commerce",
  description: "A modern mini e-commerce platform built with Next.js",
  keywords: ["e-commerce", "Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "fullstack"],
  authors: [{ name: "Islam Abdelzaher" }],
  creator: "Islam Abdelzaher",
  publisher: "Islam Abdelzaher",
  robots: "index, follow",
  openGraph: {
    title: "Mini E-Commerce",
    description: "A modern mini e-commerce platform built with Next.js",
    type: "website",
    url: "https://islamz.me",
    siteName: "Islam Abdelzaher",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini E-Commerce",
    description: "A modern mini e-commerce platform built with Next.js",
    creator: "@islamz",
    site: "@islamz",
  },
  alternates: {
    canonical: "https://islamz.me",
  },
  other: {
    "author": "Islam Abdelzaher",
    "developer": "Islam Abdelzaher",
    "tech-stack": "Next.js, React, TypeScript, Tailwind CSS, MongoDB",
    "fullstack": "true",
    "website": "https://islamz.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
