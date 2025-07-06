"use client";

import { commonLinks } from "@/constants/header";
import Link from "next/link";
import { Menu } from "lucide-react";
import CurrencyAreaDropdown from "../UI/CurrencyAreaDropdown";
import FavoriteModal from "../UI/Modals/FavoriteModal";
import SavedSearched from "../UI/Modals/SavedSearched";
import { Drawer } from "../UI/Drawer";
import { useState } from "react";
import IconButton from "../UI/Buttons/IconButton";
import AuthButton from "../UI/Buttons/AuthButton";

const FullHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <nav className="bg-gray-100 px-2">
        <div className="container mx-auto sm:px-6 lg:max-w-[1300px]">
          <div className="flex items-center justify-between gap-2">
            <div className="items-center gap-3 text-sm font-medium text-gray-800">
              <CurrencyAreaDropdown />
            </div>
            <div className="flex w-fit items-center justify-between gap-3 text-sm font-medium text-gray-800">
              <FavoriteModal />
              <div className="relative">
                <SavedSearched />
              </div>
              <div className="relative flex items-center gap-2 text-gray-800">
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="left-0 top-0 z-40 w-full bg-white transition-all duration-700">
        <div className="relative">
          <div className="container mx-auto px-6 lg:max-w-[1300px]">
            <div className="flex h-[80px] flex-row-reverse items-center justify-between md:flex-row">
              {/* Logo */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-end gap-1 text-xl font-bold text-gray-800"
                >
                  عقاري{" "}
                  <span className="block h-[5px] w-[5px] rounded-full bg-main"></span>
                </Link>
              </div>
              {/* Right-side Buttons */}
              <div className="hidden items-center gap-4 md:flex">
                {commonLinks.map((link, index) => {
                  return (
                    <Link
                      className="flex items-start gap-1 text-sm font-semibold"
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
          {commonLinks.map((link, index) => {
            return (
              <Link
                className="flex items-start gap-1 rounded-md p-2 text-sm font-semibold hover:bg-gray-100"
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
    </div>
  );
};

export default FullHeader;
