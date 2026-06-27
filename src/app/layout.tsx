import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchProvider } from "@/components/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "360 Explorer Expeditions | Luxury Travel",
  description: "Bespoke luxury expeditions to the ends of the earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased selection:bg-[#D4A373]/20 scroll-smooth`}
      style={{ scrollbarGutter: 'stable' }}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden relative bg-white text-[#1A2B3C]">
        <SearchProvider>
          <Header />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
