"use client";

import { commonLinks } from "@/constants/header";
import useScrollDetection from "@/hooks/useScrollDetection";
import Link from "next/link";
import { useState } from "react";
import IconButton from "../UI/Buttons/IconButton";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Drawer } from "../UI/Drawer";

const FullHeader: React.FC = () => {
  const isScrolled = useScrollDetection();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`-top-12 left-0 z-[1000] w-full bg-white transition-all duration-700 ${
        isScrolled ? "fixed top-0 shadow-lg" : "sticky"
      }`}
    >
      <div className="container mx-auto px-6 lg:max-w-[1440px]">
        <div className="flex h-[80px] items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Omga
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 lg:flex">
            {commonLinks.map((link, index) => (
              <div className="group relative" key={index}>
                <Link
                  href={link.url}
                  className="border-gray-500 p-2 text-sm font-medium text-gray-700 capitalize hover:border-b"
                >
                  {link.title}
                </Link>
                {link.subLinks && link.subLinks.length > 0 && (
                  <ul className="elementskit-dropdown">
                    {link.subLinks.map((subLink, subIndex) => (
                      <li key={subIndex}>
                        <Link className="block p-3" href={subLink.url}>
                          {subLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side Icons */}
          <div className="hidden items-center gap-3 lg:flex">
            <IconButton href="/search" Icon={Search} tooltip="Search" />
            <IconButton href="/cart" Icon={ShoppingBag} tooltip="Cart" />
            <IconButton href="/profile" Icon={UserRound} tooltip="Profile" />
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            className="block lg:hidden"
            onClick={() => setIsOpen(true)}
            Icon={Menu}
          />
        </div>

        {/* Mobile Navigation */}
        <Drawer
          position="left"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <nav>
            <div className="flex flex-col p-4">
              {commonLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="block rounded-md p-3 font-medium text-gray-800 capitalize hover:bg-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
        </Drawer>
      </div>
    </header>
  );
};

export default FullHeader;
