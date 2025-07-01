"use client";

import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  id: string;
  label: string;
};

type Category = {
  title: string;
  options: Option[];
};

interface MultiSelectDropdownProps {
  categories: Category[];
  selectedValues?: string[];
  onChange?: (selected: string[]) => void;
  defaultCategoryIndex?: number;
  setCategoryActive?: (index: number) => void;
  className?: string;
}

export default function MultiSelectDropdown({
  categories,
  onChange,
  selectedValues = [],
  defaultCategoryIndex = 0,
  setCategoryActive,
  className = "",
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues);
  const [activeTab, setActiveTab] = useState(defaultCategoryIndex);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    setIsOpen(false);
    onChange?.(selected);
  };

  const handleReset = () => {
    setSelected([]);
    onChange?.([]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActiveTab = (index: number) => {
    setActiveTab(index);
    setCategoryActive?.(index);
  };

  return (
    <div className="relative w-full text-right" ref={dropdownRef} dir="rtl">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-all ${className} `}
      >
        <span className={selected.length > 0 ? "font-medium" : "text-gray-800"}>
          {selected.length > 0
            ? `(${selected.length}) تم الاختيار`
            : "اختر الفئة"}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 20 : -10 }}
            transition={{ duration: 0.2 }}
            className={
              isMobile
                ? "fixed inset-x-0 bottom-0 z-[1000] max-h-[80vh] rounded-t-2xl border-t-4 border-main bg-white shadow-2xl"
                : "absolute right-0 z-10 mt-2 w-full min-w-[300px] max-w-[400px] rounded-2xl border border-gray-200 bg-white shadow-xl"
            }
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                <h3 className="text-lg font-bold text-gray-800">اختر الفئة</h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div
              className={`p-4 ${isMobile ? "max-h-[calc(80vh-56px)] overflow-y-auto" : ""}`}
            >
              {/* Tabs */}
              <div className="mb-4 flex border-b">
                {categories.map((cat, index) => (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => handleActiveTab(index)}
                    className={`border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
                      index === activeTab
                        ? "border-main text-main"
                        : "border-transparent text-gray-500 hover:text-main"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Options of active tab */}
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                {categories[activeTab]?.options.map((option) => (
                  <motion.button
                    key={option.id}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleOptionClick(option.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-2 text-right transition-colors ${
                      selected.includes(option.id)
                        ? "border-main bg-main-transparent text-main"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                    {selected.includes(option.id) && (
                      <Check className="h-4 w-4 text-main" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                className={`mt-4 flex justify-between gap-3 ${isMobile ? "border-t pt-4" : ""}`}
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                >
                  إعادة ضبط
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="rounded-xl bg-main px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-main-dark"
                >
                  تم
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
