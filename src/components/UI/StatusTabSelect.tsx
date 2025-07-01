import { useState } from "react";

interface StatusTabSelectProps {
  defaultStatus?: string;
  onChange?: (status: string) => void;
  // New prop to receive the status options
  options?: { label: string; value: string }[];
  className?: string;
}

export const StatusTabSelect = ({
  defaultStatus = "all",
  onChange,
  options,
  className,
}: StatusTabSelectProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(defaultStatus);

  const handleClick = (status: string) => {
    setSelectedStatus(status);
    onChange?.(status);
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-medium shadow-sm ${className}`}
      style={{ direction: "rtl" }} // Set RTL direction for the component
    >
      {/* Use the 'options' prop instead of the global 'statusOptions' */}
      {options?.map((option) => {
        const isActive = selectedStatus === option.value;
        const baseClasses =
          "rounded-md  h-full w-full transition-colors duration-200";
        const activeClasses = "bg-main-transparent text-main shadow-sm";
        const inactiveClasses = "text-gray-800 hover:bg-gray-100";

        return (
          <button
            type="button"
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`${baseClasses} py-1.5 text-xs ${isActive ? activeClasses : inactiveClasses}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
