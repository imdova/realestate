"use client";

import { ChevronDown, ChevronUp, LogOut, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { userType } from "@/types/next-auth";
import { menuGroups } from "@/constants/header";
import Link from "next/link";

interface UserData {
  name: string;
  email: string;
  role: userType;
}

const AuthButton = () => {
  const { requireAuth, AuthModal, authenticated } = useRequireAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const dummyUserData: UserData = {
    name: session?.user?.name || "Demo User",
    email: session?.user?.email || "demo@example.com",
    role: (session?.user?.role as userType) || "user",
  };

  const currentMenuGroups = menuGroups[dummyUserData.role];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    requireAuth(() => {
      // Optional: Any action after login
      console.log("User is logged in!");
    });
  };

  return (
    <>
      {authenticated ? (
        <>
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-gray-800 backdrop-blur-sm transition-all hover:text-main"
              whileTap={{ scale: 0.95 }}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
                <User size={14} />
              </div>
              <span className="inline text-xs md:text-sm">
                {dummyUserData.name.split(" ")[0]}
              </span>
              {isDropdownOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white/90 p-2 shadow-md ring-black/5 backdrop-blur-xl focus:outline-none"
                >
                  <div className="flex items-center gap-3 rounded-lg p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-main-dark to-main text-white">
                      <span className="font-medium">
                        {dummyUserData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {dummyUserData.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {dummyUserData.email}
                      </p>
                      {dummyUserData.role !== "default" && (
                        <span className="from-primary to-light-primary mt-1 inline-block rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-medium text-white">
                          {dummyUserData.role === "admin"
                            ? "مشرف"
                            : dummyUserData.role === "broker"
                              ? "بائع"
                              : "مستخدم"}
                        </span>
                      )}
                    </div>
                  </div>

                  {currentMenuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      <div className="my-1 border-t border-gray-100/50"></div>
                      {group.title && (
                        <div className="px-3 py-1.5 text-xs font-medium text-gray-500">
                          {group.title}
                        </div>
                      )}
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.href}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100/50"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {Icon && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                  <Icon size={16} />
                                </div>
                              )}
                              <span>{item.title}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}

                  <div className="my-1 border-t border-gray-100/50"></div>
                  <motion.button
                    onClick={() => {
                      signOut({ redirect: true, callbackUrl: "/" });
                      setIsDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <LogOut size={16} />
                    </div>
                    <span>تسجيل الخروج</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <>
          <motion.button
            onClick={handleClick}
            className="flex items-center gap-2 text-sm font-medium text-gray-800 backdrop-blur-sm transition-all hover:text-main"
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
              <User size={14} />
            </div>
            <span className="md:textsm inline text-xs">تسجيل الدخول</span>
          </motion.button>
        </>
      )}

      {AuthModal}
    </>
  );
};

export default AuthButton;
