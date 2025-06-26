"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  selectedValues?: string[]; // 👈 Add this prop
  onChange?: (selected: string[]) => void;
  defaultCategoryIndex?: number;
}

export default function MultiSelectDropdown({
  categories,
  onChange,
  selectedValues,
  defaultCategoryIndex = 0,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedValues || []);
  const [activeTab, setActiveTab] = useState(defaultCategoryIndex);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="relative inline-block w-full text-right"
      ref={dropdownRef}
      dir="rtl"
    >
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-1.5 text-xs shadow-sm"
      >
        {selected.length > 0
          ? `(${selected.length}) تم الاختيار`
          : "اختر الفئة"}
        {isOpen ? (
          <ChevronUp className="text-gray-400" size={14} />
        ) : (
          <ChevronDown className="text-gray-400" size={14} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 max-h-[80vh] w-[400px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          {/* Tabs */}
          <div className="mb-4 flex border-b">
            {categories.map((cat, index) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setActiveTab(index)}
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
          <div className="grid grid-cols-2 gap-2 text-sm">
            {categories[activeTab]?.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionClick(option.id)}
                className={`w-full rounded-full border px-3 py-1 text-right transition-colors ${
                  selected.includes(option.id)
                    ? "border-main-transparent bg-main-transparent text-main"
                    : "hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-between text-sm font-medium">
            <button
              type="button"
              onClick={handleReset}
              className="hover:bg-main-transparent rounded border border-main px-4 py-1 text-main"
            >
              إعادة ضبط
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded bg-main px-4 py-1 text-white hover:bg-main"
            >
              تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
