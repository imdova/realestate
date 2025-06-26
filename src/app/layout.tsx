import { Cairo } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Header/DynamicHeaderWrapper";
import { NextAuthProvider } from "@/NextAuthProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="ar" dir="rtl" className={cairo.variable}>
        <body className="antialiased">
          <DynamicHeaderWrapper>{children}</DynamicHeaderWrapper>
        </body>
      </html>
    </NextAuthProvider>
  );
}
