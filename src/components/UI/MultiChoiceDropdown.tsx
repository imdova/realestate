import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

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

  const toggleOption = (
    value: string,
    isRoom: boolean | undefined,
    isBathroom: boolean | undefined,
  ) => {
    let newValues = [...selectedValues];
    console.log(isRoom);
    console.log(isBathroom);
    if (autoMatchBathrooms) {
      // Find the option that was clicked
      const clickedOption = optionGroups
        .flatMap((group) => group.options)
        .find((opt) => opt.value === value);

      if (clickedOption?.isRoom) {
        // When a room is selected, find matching bathroom
        const roomNumber = clickedOption.value.match(/\d+/)?.[0];
        if (roomNumber) {
          // Remove any existing bathroom selections
          newValues = newValues.filter(
            (val) =>
              !optionGroups
                .flatMap((group) => group.options)
                .find((opt) => opt.value === val && opt.isBathroom),
          );

          // Add matching bathroom if it exists
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
        // Normal toggle for non-room options
        newValues = newValues.includes(value)
          ? newValues.filter((v) => v !== value)
          : [...newValues, value];
      }
    } else {
      // Normal toggle when autoMatchBathrooms is false
      newValues = newValues.includes(value)
        ? newValues.filter((v) => v !== value)
        : [...newValues, value];
    }

    onChange(newValues);
  };

  const clearSelection = () => {
    onChange([]);
  };

  const selectedLabels = selectedValues
    .map((value) => {
      for (const group of optionGroups) {
        const option = group.options.find((opt) => opt.value === value);
        if (option) return option.label;
      }
      return null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 text-right shadow-sm focus:outline-none sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block max-w-[120px] truncate text-xs">
          {selectedLabels || placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-1 pl-2">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </span>
        {selectedValues.length > 0 && (
          <span
            className="absolute inset-y-0 left-6 flex items-center pl-2"
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white">
          <ul
            role="listbox"
            className="max-h-60 overflow-auto py-1 focus:outline-none sm:text-sm"
          >
            {optionGroups.map((group) => (
              <div key={group.label}>
                <li className="px-3 py-1 text-right text-sm font-semibold text-gray-500">
                  {group.label}
                </li>
                {group.options.map((option) => (
                  <li
                    key={option.value}
                    className={`relative cursor-default select-none py-2 pl-3 pr-9 text-right ${
                      selectedValues.includes(option.value)
                        ? "bg-main-transparent text-main"
                        : "text-gray-900 hover:bg-gray-100"
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main">
                        ✓
                      </span>
                    )}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
