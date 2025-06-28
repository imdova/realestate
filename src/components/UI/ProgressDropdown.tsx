"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgressDropdown({
  label = "اختر",
  progress = 0,
  setProgress,
}: {
  label?: string;
  progress: number;
  setProgress: (x: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(Number(e.target.value));
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const confirmProgress = () => {
    setIsOpen(false);
  };

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

  return (
    <div
      dir="ltr"
      ref={dropdownRef}
      className="relative inline-block text-right"
    >
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
      >
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform`}
        />
        {progress === 0 ? label : <span>حتى {progress}% قبل التسليم</span>}
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-full min-w-full max-w-80 origin-top-right rounded-xl bg-white p-5 text-right shadow-2xl ring-1 ring-gray-200 md:min-w-80"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              الدفعات قبل التسليم
            </h2>

            {/* Progress Bar */}
            <div className="relative mb-6 h-10">
              {/* Track background */}
              <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 transform rounded-full bg-gray-200" />
              {/* Filled part */}
              <div
                className="absolute left-0 top-1/2 h-2 -translate-y-1/2 transform rounded-full bg-main"
                style={{ width: `${progress}%` }}
              />
              {/* Slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={progress}
                onChange={handleSliderChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute left-0 top-0 z-10 h-full w-full appearance-none bg-transparent focus:outline-none"
              />
              {/* Floating progress value */}
              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-7 z-20 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-main px-2 py-1 text-xs font-bold text-white shadow"
                    style={{
                      right: `calc(${100 - progress}% - 10px)`, // RTL alignment
                    }}
                  >
                    {progress}%
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-between gap-3">
              <button
                type="button"
                onClick={confirmProgress}
                className="flex-1 rounded-xl bg-main px-4 py-2 font-semibold text-white shadow transition hover:bg-main-dark"
              >
                تم
              </button>
              <button
                type="button"
                onClick={resetProgress}
                className="flex-1 rounded-xl border border-main px-4 py-2 font-semibold text-main transition hover:bg-teal-50"
              >
                إعادة ضبط
              </button>
            </div>

            {/* Styles */}
            <style jsx>{`
              input[type="range"] {
                -webkit-appearance: none;
              }
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                background-color: white;
                border: 3px solid var(--main-color);
                border-radius: 50%;
                cursor: pointer;
                margin-top: -9px;
              }
              input[type="range"]::-moz-range-thumb {
                height: 20px;
                width: 20px;
                background-color: white;
                border: 3px solid var(--main-color);
                border-radius: 50%;
                cursor: pointer;
              }
              input[type="range"]::-webkit-slider-runnable-track {
                height: 2px;
                background: transparent;
              }
              input[type="range"]::-moz-range-track {
                height: 2px;
                background: transparent;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
