import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0b080c',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Irshad Majeed Mir | AI/ML Engineer & Data Scientist",
  description: "Portfolio of Irshad Majeed Mir — AI/ML Engineer, Data Scientist, and Founder of RuleMatrix. Building intelligent systems from Kupwara, Kashmir.",
  keywords: ["Irshad Majeed Mir", "AI Engineer", "Data Scientist", "Machine Learning", "Portfolio", "RuleMatrix", "Full Stack Developer"],
  authors: [{ name: "Irshad Majeed Mir" }],
  openGraph: {
    title: "Irshad Majeed Mir | AI/ML Engineer",
    description: "AI/ML Engineer & Data Scientist building intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{ backgroundColor: '#0b080c', color: '#eae5ec' }}
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
