"use client";

import { MapPin, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Location {
  id: string;
  name: string;
  region?: string;
  parent?: string;
}

const LocationSearch = ({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Memoized location data
  const locations = useMemo(
    () => [
      { id: "1", name: "الإسكندرية" },
      { id: "2", name: "العلمين", region: "السلط الشمالي، مطروح" },
      { id: "3", name: "العين السخنة", region: "السويس" },
      { id: "4", name: "البروج", region: "مدينة الشروق، القاهرة" },
      {
        id: "5",
        name: "بيت الوطن",
        region: "التجمع الخاصم، القاهرة الجديدة، القاهرة",
      },
      {
        id: "6",
        name: "أليفا المستقبل سيتي",
        region: "مدينة المستقبل، القاهرة",
      },
      { id: "7", name: "المقصد", region: "العاصمة الإدارية الجديدة، القاهرة" },
      { id: "8", name: "زهراء المعادي", region: "القاهرة" },
      {
        id: "9",
        name: "أمواج",
        region: "سبدي عبد الرحمن، السلط الشمالي، مطروح",
      },
    ],
    [],
  );

  // Optimized filter function
  const filteredLocations = useMemo(() => {
    if (!searchTerm) return locations;
    const term = searchTerm.toLowerCase();
    return locations.filter(
      (location) =>
        location.name.toLowerCase().includes(term) ||
        (location.region && location.region.toLowerCase().includes(term)),
    );
  }, [locations, searchTerm]);

  // Mobile detection with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Event handlers with useCallback
  const handleSelect = useCallback(
    (location: Location) => {
      setSelectedLocation(location);
      setIsOpen(false);
      setSearchTerm("");
    },
    [setSelectedLocation],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedLocation(null);
      setSearchTerm("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [setSelectedLocation],
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Optimized click outside handler
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

  // Focus management - only focus input when dropdown opens on desktop
  useEffect(() => {
    if (isOpen && inputRef.current && !isMobile) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  // Handle input focus to show dropdown
  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Input/Selected Location Display */}
      <div
        className={`flex w-full cursor-text items-center rounded-lg border border-gray-300 bg-white`}
        onClick={handleToggle}
      >
        {selectedLocation ? (
          <div className="flex w-full items-center justify-between p-1 px-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {selectedLocation.name}
                </p>
                {selectedLocation.region && (
                  <p className="text-xs text-gray-500">
                    {selectedLocation.region}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleClear}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex w-full items-center gap-2 p-2.5">
            <MapPin className="h-4 w-4 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="ابحث عن موقع..."
              className="flex-1 bg-transparent text-right outline-none placeholder:text-sm placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
            />
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 20 : -10 }}
            transition={{ duration: 0.2 }}
            className={
              isMobile
                ? "fixed inset-x-0 bottom-0 z-[1000] max-h-[60vh] rounded-t-xl border-t-4 border-main bg-white shadow-2xl"
                : "absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
            }
          >
            {/* Mobile header */}
            {isMobile && (
              <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
                <h3 className="font-semibold text-gray-800">اختر موقع</h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                  aria-label="Close location search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="bg-white p-2">
              {/* Search input for mobile */}
              {isMobile && (
                <div className="sticky top-14 z-50 mt-2 flex items-center rounded-lg border bg-white p-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن موقع..."
                    className="flex-1 bg-transparent px-2 text-right outline-none placeholder:text-sm placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Location list */}
            <div
              className={`${isMobile ? "max-h-[calc(60vh-112px)]" : "max-h-60"} overflow-y-auto overscroll-contain`}
            >
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer border-b border-gray-100 px-4 py-3 text-right last:border-b-0 hover:bg-gray-50"
                    onClick={() => handleSelect(location)}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {location.name}
                    </p>
                    {location.region && (
                      <p className="text-xs text-gray-500">{location.region}</p>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-sm text-gray-500">
                  لا توجد نتائج مطابقة
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSearch;
