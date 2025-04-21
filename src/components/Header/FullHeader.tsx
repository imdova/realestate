"use client";

import { commonLinks } from "@/constants/header";
import useScrollDetection from "@/hooks/useScrollDetection";
import Link from "next/link";
import { useState } from "react";
import IconButton from "../UI/Buttons/IconButton";
import { Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Drawer } from "../UI/Drawer";
import Image from "next/image";
import DynamicButton from "../UI/Buttons/DynamicButton";
import Collapse from "../UI/Collapse";

const FullHeader: React.FC = () => {
  const isScrolled = useScrollDetection();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`-top-12 left-0 z-40 w-full bg-white transition-all duration-700 ${
        isScrolled ? "fixed top-0 shadow-lg" : "sticky"
      }`}
    >
      <div className="relative">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <div className="flex h-[80px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-end gap-1 text-xl font-bold text-gray-800"
              >
                Omga{" "}
                <span className="bg-main block h-[5px] w-[5px] rounded-full"></span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-6 lg:flex">
              {commonLinks.map((link, index) => (
                <div className="group" key={index}>
                  <Link
                    href={link.url}
                    className="border-gray-500 p-2 text-sm font-medium text-gray-700 capitalize hover:border-b"
                  >
                    {link.title}
                  </Link>
                  {link.subLinks && link.subLinks.length > 0 && (
                    <ul className="elementskit-dropdown min-w-[200px]">
                      {link.subLinks.map((subLink, subIndex) => (
                        <li
                          className="hover:text-main text-gray-600 transition"
                          key={subIndex}
                        >
                          <Link className="block p-3" href={subLink.url}>
                            {subLink.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  {link.gridLinks && link.gridLinks.length > 0 && (
                    <div className="elementskit-dropdown -left-0 flex w-full justify-between !rounded-b-none">
                      <ul className="grid w-full grid-cols-4 gap-3">
                        {link.gridLinks.map((gridLink, gridIndex) => (
                          <li className="p-3" key={gridIndex}>
                            <h2 className="mb-2 text-lg font-bold">
                              {gridLink.heading}
                            </h2>
                            <ul>
                              {gridLink.subLinks.map((link, index) => {
                                return (
                                  <li key={index}>
                                    <Link
                                      className="hover:text-main block p-2 text-sm font-semibold text-gray-600 transition"
                                      href={link.url}
                                    >
                                      {link.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        ))}
                      </ul>
                      {link.banner && (
                        <div className="relative flex h-[300px] w-[600px] flex-col items-center overflow-hidden rounded-3xl">
                          <Image
                            className="absolute top-0 left-0 h-full w-full object-cover brightness-75"
                            src={link.banner.image ?? "/fallback-image.jpg"}
                            alt="banner image"
                            width={200}
                            height={500}
                          />
                          <div className="relative flex h-full w-full flex-col justify-center p-8">
                            <h1 className="mb-2 max-w-[250px] text-4xl font-bold text-white">
                              {link.banner.title}
                            </h1>
                            <p className="mb-2 text-gray-700">
                              {link.banner.details}
                            </p>
                            <DynamicButton
                              variant="white"
                              href={"/"}
                              label={"Shop Now"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
                {commonLinks.map((link, index) => (
                  <div key={index}>
                    {/* sublinks links */}
                    {link.subLinks && link.subLinks.length > 0 && (
                      <Collapse
                        url={link.url}
                        key={link.title}
                        title={link.title}
                      >
                        <ul>
                          {link.subLinks.map((subLink, subIndex) => (
                            <li
                              className="hover:text-main text-gray-600 transition"
                              key={subIndex}
                            >
                              <Link
                                className="block p-2 text-sm"
                                href={subLink.url}
                              >
                                {subLink.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    )}
                    {/* grid list links */}
                    {link.gridLinks && link.gridLinks.length > 0 && (
                      <Collapse
                        url={link.url}
                        key={link.title}
                        title={link.title}
                      >
                        <div>
                          <ul>
                            {link.gridLinks.map((gridLink, gridIndex) => (
                              <Collapse
                                url={link.url}
                                title={gridLink.heading}
                                key={gridIndex}
                              >
                                <li>
                                  <ul>
                                    {gridLink.subLinks.map((link, index) => {
                                      return (
                                        <li key={index}>
                                          <Link
                                            className="hover:text-main block p-2 text-sm text-gray-600 transition"
                                            href={link.url}
                                          >
                                            {link.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </li>
                              </Collapse>
                            ))}
                          </ul>
                        </div>
                      </Collapse>
                    )}
                    {/* Normal links */}
                    {!link.gridLinks && !link.subLinks && (
                      <ul>
                        <li className="hover:text-main text-gray-600 transition">
                          <Link
                            className="block p-3 text-sm font-semibold text-gray-800"
                            href={link.url}
                          >
                            {link.title}
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default FullHeader;
