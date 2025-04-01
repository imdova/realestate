import { useState } from "react";

type FilterOption = {
  id: string;
  label: string;
  badge?: string;
};

const ProductFilter = ({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters: FilterOption[] = [
    { id: "all", label: "Best Seller Products" },
    { id: "Pulse Oximeters", label: "Medicine" },
    { id: "Patient Care", label: "Covid Care" },
    { id: "Wound Care", label: "Respiratory" },
    { id: "baby", label: "Baby Care" },
    { id: "sale", label: "SALE", badge: "63% OFF" },
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-colors duration-200 md:text-sm ${
            activeFilter === filter.id
              ? "bg-main text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } relative`}
        >
          {filter.label}
          {filter.badge && (
            <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              {filter.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
