"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, FC, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface ArabicDropdownProps {
  options: DropdownOption[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
}

const ArabicDropdown: FC<ArabicDropdownProps> = ({
  options,
  label,
  value,
  onChange,
  id,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div dir="rtl" className="w-full text-right" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none ${className}`}
        >
          {selected?.label || "اختر"}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {/* Dropdown list */}
        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                  value === option.value ? "bg-gray-100 font-semibold" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ArabicDropdown;
