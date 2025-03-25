"use client";

import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeader from "@/components/Header/DynamicHeader";
import useScrollDetection from "@/hooks/useScrollDetection";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isScrolled = useScrollDetection();

  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <DynamicHeader />
        <main
          style={{ paddingTop: isScrolled ? "70px" : 0 }}
          className="h-[1000px]"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
