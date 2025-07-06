"use client";

import { BlogLinks } from "@/constants/header";
import Link from "next/link";
import { Home, Menu, Search } from "lucide-react";
import { Drawer } from "../UI/Drawer";
import { Suspense, useState } from "react";
import IconButton from "../UI/Buttons/IconButton";
import SearchDrawer from "../UI/SearchDrawer";
import { usePathname } from "next/navigation";
import { isCurrentPage } from "@/util";

const BlogHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative">
      <nav className="hidden px-2 py-6 md:block">
        <div className="container mx-auto sm:px-6 lg:max-w-[1200px]">
          <div className="flex items-center justify-between gap-2">
            <IconButton className="block" href="/" Icon={Home} />
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-end gap-1 text-3xl font-bold text-gray-800"
              >
                عقاري{" "}
                <span className="block h-[5px] w-[5px] rounded-full bg-main"></span>
              </Link>
            </div>
            <div></div>
          </div>
        </div>
      </nav>
      <header className="left-0 top-0 z-40 mb-4 w-full border-y border-gray-200 bg-white transition-all duration-700">
        <div className="relative">
          <div className="container mx-auto px-6 lg:max-w-[1200px]">
            <div className="flex h-[60px] flex-row-reverse items-center justify-between md:flex-row">
              {/* Right-side Buttons */}
              <div className="hidden items-center gap-4 md:flex">
                {BlogLinks.map((link, index) => {
                  const isActive = isCurrentPage(pathname, link.url);
                  return (
                    <Link
                      className={`flex items-start gap-1 text-sm font-semibold ${isActive && "text-main"}`}
                      key={index}
                      href={link.url}
                    >
                      {link.title}{" "}
                      {link.isNew && (
                        <span className="flex h-4 items-center justify-center rounded-full bg-main px-[9px] text-[10px] font-semibold text-white">
                          جديد
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => setSearchIsOpen(true)}
                className="text-gray-700"
              >
                <Search size={16} />
              </button>
              {/* Logo */}
              <div className="flex items-center md:hidden">
                <Link
                  href="/"
                  className="flex items-end gap-1 text-2xl font-bold text-gray-800"
                >
                  عقاري{" "}
                  <span className="block h-[5px] w-[5px] rounded-full bg-main"></span>
                </Link>
              </div>
              <IconButton
                className="block md:hidden"
                onClick={() => setIsOpen(true)}
                Icon={Menu}
              />
            </div>
          </div>
        </div>
      </header>
      <Drawer
        width="w-60"
        position="right"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="mt-8 flex flex-col gap-3">
          {BlogLinks.map((link, index) => {
            const isActive = isCurrentPage(pathname, link.url);
            return (
              <Link
                className={`flex items-start gap-1 rounded-md p-2 text-sm ${isActive && "text-main"} font-semibold hover:bg-gray-100`}
                key={index}
                href={link.url}
              >
                {link.title}{" "}
                {link.isNew && (
                  <span className="flex h-4 items-center justify-center rounded-full bg-main px-[9px] text-[10px] font-semibold text-white">
                    جديد
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </Drawer>
      <Suspense>
        <SearchDrawer
          isOpen={searchIsOpen}
          onClose={() => setSearchIsOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default BlogHeader;
