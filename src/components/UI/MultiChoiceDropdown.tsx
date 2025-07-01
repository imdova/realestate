"use client";

import { ChevronDown, X, Check } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OptionGroup = {
  label: string;
  options: {
    value: string;
    label: string;
    isRoom?: boolean;
    isBathroom?: boolean;
  }[];
};

type MultiSelectDropdownProps = {
  id: string;
  label: string;
  optionGroups: OptionGroup[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
  placeholder?: string;
  autoMatchBathrooms?: boolean;
};

export const MultiChoiceDropdown = ({
  optionGroups,
  selectedValues,
  onChange,
  className = "",
  placeholder = "اختر",
  autoMatchBathrooms = false,
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
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

  // Memoize selected labels for performance
  const selectedLabels = useMemo(() => {
    return selectedValues
      .map((value) => {
        for (const group of optionGroups) {
          const option = group.options.find((opt) => opt.value === value);
          if (option) return option.label;
        }
        return null;
      })
      .filter(Boolean)
      .join(", ");
  }, [selectedValues, optionGroups]);

  const toggleOption = (
    value: string,
    isRoom: boolean | undefined,
    isBathroom: boolean | undefined,
  ) => {
    let newValues = [...selectedValues];
    console.log(isRoom);
    console.log(isBathroom);
    if (autoMatchBathrooms) {
      const clickedOption = optionGroups
        .flatMap((group) => group.options)
        .find((opt) => opt.value === value);

      if (clickedOption?.isRoom) {
        const roomNumber = clickedOption.value.match(/\d+/)?.[0];
        if (roomNumber) {
          // Remove any matching bathrooms
          newValues = newValues.filter(
            (val) =>
              !optionGroups
                .flatMap((group) => group.options)
                .find((opt) => opt.value === val && opt.isBathroom),
          );

          // Find matching bathroom
          const matchingBathroom = optionGroups
            .flatMap((group) => group.options)
            .find((opt) => opt.isBathroom && opt.value === roomNumber);

          if (matchingBathroom) {
            newValues = [
              ...newValues.filter((v) => v !== value),
              value,
              matchingBathroom.value,
            ];
          } else {
            newValues = newValues.includes(value)
              ? newValues.filter((v) => v !== value)
              : [...newValues, value];
          }
        }
      } else {
        newValues = newValues.includes(value)
          ? newValues.filter((v) => v !== value)
          : [...newValues, value];
      }
    } else {
      newValues = newValues.includes(value)
        ? newValues.filter((v) => v !== value)
        : [...newValues, value];
    }

    onChange(newValues);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 focus:outline-none ${className} `}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={`truncate ${selectedValues.length > 0 ? "font-medium" : "text-gray-800"}`}
        >
          {selectedLabels || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedValues.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={clearSelection}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </motion.span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
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
                ? "fixed inset-x-0 bottom-0 z-[1000] max-h-[70vh] rounded-t-2xl border-t-4 border-main bg-white shadow-2xl"
                : "absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl"
            }
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                <h3 className="font-semibold text-gray-800">الخيارات</h3>
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
              className={`overflow-y-auto ${isMobile ? "max-h-[calc(70vh-56px)]" : "max-h-60"}`}
            >
              <ul role="listbox" className="divide-y divide-gray-100">
                {optionGroups.map((group) => (
                  <li key={group.label}>
                    <div className="px-4 py-2">
                      <span className="text-sm font-semibold text-gray-500">
                        {group.label}
                      </span>
                    </div>
                    <ul>
                      {group.options.map((option) => (
                        <motion.li
                          key={option.value}
                          whileTap={{ scale: 0.98 }}
                          className={`relative cursor-pointer px-4 py-2.5 text-right transition-colors ${
                            selectedValues.includes(option.value)
                              ? "bg-main-transparent"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            toggleOption(
                              option.value,
                              option.isRoom,
                              option.isBathroom,
                            )
                          }
                        >
                          <span className="block truncate">{option.label}</span>
                          {selectedValues.includes(option.value) && (
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-main">
                              <Check className="h-4 w-4" />
                            </span>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
