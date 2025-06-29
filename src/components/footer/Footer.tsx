import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-200 bg-[url(/images/FooterBackground.svg)] bg-[length:28px_28px] bg-repeat px-4 py-6 text-white">
      <div className="container mx-auto px-4 lg:max-w-[1440px]">
        {/* Top section with app store buttons */}
        <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            {/* App download section */}
            <button>
              <Image
                className="w-24"
                src={"/images/google-play.svg"}
                width={150}
                height={150}
                alt="google-play"
              />
            </button>

            <button>
              <Image
                className="w-24"
                src={"/images/app-store.svg"}
                width={150}
                height={150}
                alt="app-store"
              />
            </button>
          </div>

          <div dir="ltr" className="flex space-x-4">
            <button className="text-white hover:text-gray-200">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-gray-200">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-gray-200">
              <Instagram className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-gray-200">
              <Linkedin className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Middle section with copyright */}
        <div
          dir="ltr"
          className="mb-4 flex flex-col items-center justify-between md:flex-row"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white">
              © {currentYear} - 2008 Aqary.eg
            </span>
          </div>

          <div className="mt-2 flex space-x-4 md:mt-0">
            <Link
              href="#"
              className="text-xs text-white hover:text-gray-200 hover:underline"
            >
              سياسة الخصوصية و الشروط
            </Link>
            <Link
              href="#"
              className="text-xs text-white hover:text-gray-200 hover:underline"
            >
              اتصل بنا
            </Link>
            <Link
              href="#"
              className="text-xs text-white hover:text-gray-200 hover:underline"
            >
              نبذة عنا
            </Link>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center">
          <p className="text-xs text-white">
            © 2008 - 2025 Aqary.eg المنصة العقارية في مصر
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
