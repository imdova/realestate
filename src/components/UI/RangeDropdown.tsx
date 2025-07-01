"use client";

import { ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RangeDropdownProps {
  id: string;
  title: string;
  onApply: (min: number | null, max: number | null) => void;
  initialMin?: number | null;
  initialMax?: number | null;
  minPlaceholder: string;
  maxPlaceholder: string;
  className?: string;
}

export const RangeDropdown: React.FC<RangeDropdownProps> = ({
  id,
  title,
  onApply,
  initialMin = null,
  initialMax = null,
  minPlaceholder,
  maxPlaceholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minValue, setMinValue] = useState<number | null>(initialMin);
  const [maxValue, setMaxValue] = useState<number | null>(initialMax);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinValue(value === "" ? null : Number(value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxValue(value === "" ? null : Number(value));
  };

  const handleApply = () => {
    onApply(minValue, maxValue);
    setIsOpen(false);
  };

  const handleReset = () => {
    setMinValue(null);
    setMaxValue(null);
    onApply(null, null);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full text-right" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition-all focus:outline-none ${className} `}
        id={`${id}-menu-button`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
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
                : "absolute right-0 z-10 mt-2 w-full min-w-[300px] rounded-xl border border-gray-200 bg-white shadow-xl"
            }
            role="menu"
            aria-orientation="vertical"
            aria-labelledby={`${id}-menu-button`}
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
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
              {/* Min and Max input fields */}
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`${id}-min`}
                    className="mb-1 block text-right text-sm font-medium text-gray-700"
                  >
                    الحد الأدنى{" "}
                    {title.toLowerCase() === "area" ? "متر مربع" : ""}
                  </label>
                  <input
                    type="number"
                    name={`${id}-min`}
                    id={`${id}-min`}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right shadow-sm outline-none"
                    placeholder={minPlaceholder}
                    value={minValue === null ? "" : minValue}
                    onChange={handleMinChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${id}-max`}
                    className="mb-1 block text-right text-sm font-medium text-gray-700"
                  >
                    الحد الأعلى{" "}
                    {title.toLowerCase() === "area" ? "متر مربع" : ""}
                  </label>
                  <input
                    type="number"
                    name={`${id}-max`}
                    id={`${id}-max`}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-right shadow-sm outline-none"
                    placeholder={maxPlaceholder}
                    value={maxValue === null ? "" : maxValue}
                    onChange={handleMaxChange}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div
                className={`flex justify-between gap-3 ${isMobile ? "border-t pt-4" : ""}`}
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
                >
                  إعادة ضبط
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="flex-1 rounded-xl bg-main px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-main-dark"
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
};
