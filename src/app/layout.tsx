import { Raleway } from "next/font/google";
import "./globals.css";
import DynamicHeaderWrapper from "@/components/Header/DynamicHeaderWrapper";

// export const metadata = {
//   title: {
//     default: "Home | Omga e-pharmacy",
//     template: "%s | Omga e-pharmacy",
//   },
//   description: "Omga Omga",
// };

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="antialiased">
        <DynamicHeaderWrapper>{children}</DynamicHeaderWrapper>
      </body>
    </html>
  );
}
