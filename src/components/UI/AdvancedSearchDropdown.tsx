import { ChevronDown, SlidersHorizontal } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface FilterRange {
  option: string | null;
  min: number | null;
  max: number | null;
}

interface Filters {
  downPayment: FilterRange;
  price: FilterRange;
  area: FilterRange;
  keywords: string;
  agentType: string | null;
}

interface AdvancedSearchDropdownProps {
  initialDownPayment?: {
    option?: string | null;
    min?: number | null;
    max?: number | null;
  };
  initialPrice?: {
    option?: string | null;
    min?: number | null;
    max?: number | null;
  };
  initialArea?: {
    option?: string | null;
    min?: number | null;
    max?: number | null;
  };
  initialKeywords?: string;
  initialAgentType?: string | null;
  onFilterChange: (filters: Filters) => void;
  className?: string;
}

const AdvancedSearchDropdown: React.FC<AdvancedSearchDropdownProps> = ({
  initialDownPayment = {},
  initialPrice = {},
  initialArea = {},
  initialKeywords = "",
  initialAgentType = null,
  className,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize state from props
  const [downPaymentOption, setDownPaymentOption] = useState<string | null>(
    initialDownPayment.option || null,
  );
  const [downPaymentMin, setDownPaymentMin] = useState<number | null>(
    initialDownPayment.min || null,
  );
  const [downPaymentMax, setDownPaymentMax] = useState<number | null>(
    initialDownPayment.max || null,
  );

  const [priceOption, setPriceOption] = useState<string | null>(
    initialPrice.option || null,
  );
  const [priceMin, setPriceMin] = useState<number | null>(
    initialPrice.min || null,
  );
  const [priceMax, setPriceMax] = useState<number | null>(
    initialPrice.max || null,
  );

  const [areaOption, setAreaOption] = useState<string | null>(
    initialArea.option || null,
  );
  const [areaMin, setAreaMin] = useState<number | null>(
    initialArea.min || null,
  );
  const [areaMax, setAreaMax] = useState<number | null>(
    initialArea.max || null,
  );

  const [keywords, setKeywords] = useState<string>(initialKeywords);
  const [agentType, setAgentType] = useState<string | null>(initialAgentType);

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

  const handleApply = () => {
    const filters = {
      downPayment: {
        option: downPaymentOption,
        min: downPaymentMin,
        max: downPaymentMax,
      },
      price: {
        option: priceOption,
        min: priceMin,
        max: priceMax,
      },
      area: {
        option: areaOption,
        min: areaMin,
        max: areaMax,
      },
      keywords,
      agentType,
    };

    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    setDownPaymentOption(null);
    setDownPaymentMin(null);
    setDownPaymentMax(null);
    setPriceOption(null);
    setPriceMin(null);
    setPriceMax(null);
    setAreaOption(null);
    setAreaMin(null);
    setAreaMax(null);
    setKeywords("");
    setAgentType(null);

    onFilterChange({
      downPayment: { option: null, min: null, max: null },
      price: { option: null, min: null, max: null },
      area: { option: null, min: null, max: null },
      keywords: "",
      agentType: null,
    });
  };

  const renderInputs = (
    option: string | null,
    min: number | null,
    max: number | null,
    setMin: (val: number | null) => void,
    setMax: (val: number | null) => void,
  ) => {
    if (option !== "min") return null;

    return (
      <div className="mb-3 space-y-2">
        <input
          type="number"
          placeholder="أدنى قيمة"
          className="w-full rounded border border-gray-200 p-2 text-sm"
          value={min ?? ""}
          onChange={(e) => setMin(Number(e.target.value) || null)}
        />
        <input
          type="number"
          placeholder="أقصى قيمة"
          className="w-full rounded border border-gray-200 p-2 text-sm"
          value={max ?? ""}
          onChange={(e) => setMax(Number(e.target.value) || null)}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full text-right" ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm transition-all duration-300 ease-in-out focus:outline-none ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SlidersHorizontal size={15} /> بحث متقدم{" "}
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-gray-800">فلاتر البحث</h3>

          {/* مقدم (م) */}
          <div className="mb-5">
            <h4 className="mb-2 text-sm font-medium text-gray-700">مقدم (م)</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">الحد الأدنى</label>
                <input
                  type="checkbox"
                  checked={downPaymentOption === "min"}
                  onChange={() =>
                    setDownPaymentOption(
                      downPaymentOption === "min" ? null : "min",
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>

              {renderInputs(
                downPaymentOption,
                downPaymentMin,
                downPaymentMax,
                setDownPaymentMin,
                setDownPaymentMax,
              )}

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">أقل مقدم</label>
                <input
                  type="checkbox"
                  checked={downPaymentOption === "lowest"}
                  onChange={() =>
                    setDownPaymentOption(
                      downPaymentOption === "lowest" ? null : "lowest",
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">أعلى مقدم</label>
                <input
                  type="checkbox"
                  checked={downPaymentOption === "highest"}
                  onChange={() =>
                    setDownPaymentOption(
                      downPaymentOption === "highest" ? null : "highest",
                    )
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>
            </div>
          </div>

          {/* المساحة (متر مربع) */}
          <div className="mb-5">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              المساحة (متر مربع)
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">الحد الأدنى</label>
                <input
                  type="checkbox"
                  checked={areaOption === "min"}
                  onChange={() =>
                    setAreaOption(areaOption === "min" ? null : "min")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>

              {renderInputs(
                areaOption,
                areaMin,
                areaMax,
                setAreaMin,
                setAreaMax,
              )}

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">أقل مساحة</label>
                <input
                  type="checkbox"
                  checked={areaOption === "lowest"}
                  onChange={() =>
                    setAreaOption(areaOption === "lowest" ? null : "lowest")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">أكبر مساحة</label>
                <input
                  type="checkbox"
                  checked={areaOption === "highest"}
                  onChange={() =>
                    setAreaOption(areaOption === "highest" ? null : "highest")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>
            </div>
          </div>

          {/* الكلمات الدالة */}
          <div className="mb-5">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              الكلمات الدالة
            </h4>
            <input
              type="text"
              placeholder="أضف كلمات رئيسية متعلقة بالعقار"
              className="w-full rounded border border-gray-200 p-2 text-sm"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* الوكيل العقاري أو الوكالة العقارية */}
          <div className="mb-5">
            <h4 className="mb-2 text-sm font-medium text-gray-700">
              الوكيل العقاري أو الوكالة العقارية
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">الوكيل العقاري</label>
                <input
                  type="checkbox"
                  checked={agentType === "agent"}
                  onChange={() =>
                    setAgentType(agentType === "agent" ? null : "agent")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">
                  الوكالة العقارية
                </label>
                <input
                  type="checkbox"
                  checked={agentType === "agency"}
                  onChange={() =>
                    setAgentType(agentType === "agency" ? null : "agency")
                  }
                  className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t pt-3">
            <button
              type="button"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={handleReset}
            >
              إعادة ضبط
            </button>
            <button
              type="button"
              className="rounded bg-main px-3 py-1 text-sm font-medium text-white hover:bg-main-dark"
              onClick={handleApply}
            >
              تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchDropdown;
