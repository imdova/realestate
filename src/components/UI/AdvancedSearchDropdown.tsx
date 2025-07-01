"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterRange {
  option: string | null;
  min: number | null;
  max: number | null;
}

interface Filters {
  downPayment: FilterRange;
  price: FilterRange;
  area: FilterRange;
  keywords: string[]; // ← بدلاً من string
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
  initialAgentType = null,
  className,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const [keywords, setKeywords] = useState<string>("");
  const [keywordList, setKeywordList] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywords.trim()) {
      e.preventDefault();
      if (!keywordList.includes(keywords.trim())) {
        setKeywordList([...keywordList, keywords.trim()]);
      }
      setKeywords(""); // تفريغ الحقل بعد الإضافة
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywordList(keywordList.filter((k) => k !== keyword));
  };
  const [agentType, setAgentType] = useState<string | null>(initialAgentType);

  // Check for mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

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
    const filters: Filters = {
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
      keywords: keywordList, // ← نرسل المصفوفة هنا
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
    setKeywordList([]); // ← تفريغ قائمة الكلمات
    setAgentType(null);

    onFilterChange({
      downPayment: { option: null, min: null, max: null },
      price: { option: null, min: null, max: null },
      area: { option: null, min: null, max: null },
      keywords: [],
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
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="my-3 space-y-2 overflow-hidden"
      >
        <input
          type="number"
          placeholder="أدنى قيمة"
          className="w-full rounded-lg border border-gray-200 p-2 text-sm shadow-sm focus:border-main focus:ring-main"
          value={min ?? ""}
          onChange={(e) => setMin(Number(e.target.value) || null)}
        />
        <input
          type="number"
          placeholder="أقصى قيمة"
          className="w-full rounded-lg border border-gray-200 p-2 text-sm shadow-sm focus:border-main focus:ring-main"
          value={max ?? ""}
          onChange={(e) => setMax(Number(e.target.value) || null)}
        />
      </motion.div>
    );
  };

  return (
    <div className="relative w-full text-right" ref={dropdownRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        className={`inline-flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-all focus:outline-none ${className} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-main" />
          <span className="text-xs">بحث متقدم</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
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
            className={` ${
              isMobile
                ? "fixed inset-x-0 bottom-0 z-50 max-h-[80vh] rounded-t-2xl border-t-4 border-main bg-white shadow-2xl"
                : "absolute left-0 z-10 mt-2 w-80 rounded-2xl border border-gray-200 bg-white shadow-xl"
            } `}
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                <h3 className="text-lg font-bold text-gray-800">بحث متقدم</h3>
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
              className={`no-scrollbar overflow-y-auto ${isMobile ? "max-h-[calc(80vh-56px)] p-4" : "max-h-[calc(80vh-56px)] p-4"}`}
            >
              {!isMobile && (
                <h3 className="mb-4 text-lg font-bold text-gray-800">
                  بحث متقدم
                </h3>
              )}

              {/* مقدم (م) */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  مقدم (م)
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "الحد الأدنى", value: "min" },
                    { label: "أقل مقدم", value: "lowest" },
                    { label: "أعلى مقدم", value: "highest" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center justify-between"
                    >
                      <label className="text-sm text-gray-700">
                        {item.label}
                      </label>
                      <input
                        type="checkbox"
                        checked={downPaymentOption === item.value}
                        onChange={() =>
                          setDownPaymentOption(
                            downPaymentOption === item.value
                              ? null
                              : item.value,
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                      />
                    </div>
                  ))}
                </div>

                {renderInputs(
                  downPaymentOption,
                  downPaymentMin,
                  downPaymentMax,
                  setDownPaymentMin,
                  setDownPaymentMax,
                )}
              </div>

              {/* المساحة (متر مربع) */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  المساحة (متر مربع)
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "الحد الأدنى", value: "min" },
                    { label: "أقل مساحة", value: "lowest" },
                    { label: "أكبر مساحة", value: "highest" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center justify-between"
                    >
                      <label className="text-sm text-gray-700">
                        {item.label}
                      </label>
                      <input
                        type="checkbox"
                        checked={areaOption === item.value}
                        onChange={() =>
                          setAreaOption(
                            areaOption === item.value ? null : item.value,
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                      />
                    </div>
                  ))}
                </div>

                {renderInputs(
                  areaOption,
                  areaMin,
                  areaMax,
                  setAreaMin,
                  setAreaMax,
                )}
              </div>

              {/* الكلمات الدالة */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  الكلمات الدالة
                </h4>

                {/* حقل الإدخال */}
                <input
                  type="text"
                  placeholder="أضف كلمات رئيسية متعلقة بالعقار"
                  className="w-full rounded-lg border border-gray-200 p-2 text-sm shadow-sm"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {/* عرض الكلمات المضافة */}
                {keywordList.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keywordList.map((word, idx) => (
                      <div
                        key={idx}
                        className="bg-main/10 flex items-center gap-1 rounded-full px-3 py-1 text-sm text-main"
                      >
                        {word}
                        <button onClick={() => removeKeyword(word)}>
                          <X className="h-4 w-4 text-main hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* الوكيل العقاري أو الوكالة العقارية */}
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  الوكيل العقاري أو الوكالة العقارية
                </h4>
                <div className="space-y-3">
                  {[
                    { label: "الوكيل العقاري", value: "agent" },
                    { label: "الوكالة العقارية", value: "agency" },
                  ].map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center justify-between"
                    >
                      <label className="text-sm text-gray-700">
                        {item.label}
                      </label>
                      <input
                        type="checkbox"
                        checked={agentType === item.value}
                        onChange={() =>
                          setAgentType(
                            agentType === item.value ? null : item.value,
                          )
                        }
                        className="h-4 w-4 rounded border-gray-300 text-main focus:ring-main"
                      />
                    </div>
                  ))}
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

export default AdvancedSearchDropdown;
