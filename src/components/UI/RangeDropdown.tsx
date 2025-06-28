import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// Define the props for the RangeDropdown component
interface RangeDropdownProps {
  id: string; // Unique ID for the dropdown
  title: string; // Title for the dropdown (e.g., "Area", "Price")
  onApply: (min: number | null, max: number | null) => void; // Callback when apply button is clicked
  initialMin?: number | null; // Initial minimum value
  initialMax?: number | null; // Initial maximum value
  minPlaceholder: string; // Placeholder for the min input field
  maxPlaceholder: string; // Placeholder for the max input field
}

export const RangeDropdown: React.FC<RangeDropdownProps> = ({
  id,
  title,
  onApply,
  initialMin = null,
  initialMax = null,
  minPlaceholder,
  maxPlaceholder,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const [minValue, setMinValue] = useState<number | null>(initialMin); // State for minimum value
  const [maxValue, setMaxValue] = useState<number | null>(initialMax); // State for maximum value
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  // Handle clicks outside the dropdown to close it
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

  // Handle changes in the minimum value input
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinValue(value === "" ? null : Number(value));
  };

  // Handle changes in the maximum value input
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxValue(value === "" ? null : Number(value));
  };

  // Handle the "Apply" button click
  const handleApply = () => {
    onApply(minValue, maxValue);
    setIsOpen(false);
  };

  // Handle the "Reset" button click
  const handleReset = () => {
    setMinValue(null);
    setMaxValue(null);
    onApply(null, null); // Also reset the parent state
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <button
        type="button"
        className="inline-flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:outline-none"
        id={`${id}-menu-button`}
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {/* Dropdown arrow icon */}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      {/* Dropdown panel */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 min-w-full origin-top-right scale-100 transform rounded-lg bg-white p-2 opacity-100 shadow-lg transition-all duration-300 ease-in-out focus:outline-none sm:min-w-72"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`${id}-menu-button`}
        >
          <div className="p-4 py-1" role="none">
            {/* Min and Max input fields */}
            <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="w-full flex-1">
                <label
                  htmlFor={`${id}-min`}
                  className="mb-1 block text-right text-sm font-medium text-gray-700"
                >
                  الحد الأدنى {title.toLowerCase() === "area" ? "متر مربع" : ""}
                </label>
                <input
                  type="number"
                  name={`${id}-min`}
                  id={`${id}-min`}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-right outline-none sm:text-sm"
                  placeholder={minPlaceholder}
                  value={minValue === null ? "" : minValue}
                  onChange={handleMinChange}
                />
              </div>
              <div className="w-full flex-1">
                <label
                  htmlFor={`${id}-max`}
                  className="mb-1 block text-right text-sm font-medium text-gray-700"
                >
                  الحد الأعلى {title.toLowerCase() === "area" ? "متر مربع" : ""}
                </label>
                <input
                  type="number"
                  name={`${id}-max`}
                  id={`${id}-max`}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-right outline-none sm:text-sm"
                  placeholder={maxPlaceholder}
                  value={maxValue === null ? "" : maxValue}
                  onChange={handleMaxChange}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex flex-1 justify-center rounded-lg border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                onClick={handleReset}
              >
                إعادة ضبط
              </button>
              <button
                type="button"
                className="inline-flex flex-1 justify-center rounded-lg border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-main-dark focus:outline-none sm:text-sm"
                onClick={handleApply}
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
