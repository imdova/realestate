"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import LocationSearch from "../UI/LocationSearch";
import MultiSelectDropdown from "../UI/MultiSelectDropdown";
import { MultiChoiceDropdown } from "../UI/MultiChoiceDropdown";
import AdvancedSearchDropdown from "../UI/AdvancedSearchDropdown";
import { StatusTabSelect } from "../UI/StatusTabSelect";
import { RangeDropdown } from "../UI/RangeDropdown";
import { useAppSettings } from "@/hooks/useAppSettings";
import ArabicDropdown from "../UI/Dropdown";
import { Clock } from "lucide-react";

type OptionType = {
  value: string;
  label: string;
};

type OptionGroup = {
  label: string;
  options: {
    value: string;
    label: string;
    isRoom?: boolean;
    isBathroom?: boolean;
  }[];
};

interface FilterRange {
  option: string | null;
  min: number | null;
  max: number | null;
}

interface Filters {
  downPayment: FilterRange;
  price: FilterRange;
  area: FilterRange;
  keywords: string[];
  agentType: string | null;
}

interface Location {
  id: string;
  name: string;
  region?: string;
  parent?: string;
}

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const settings = useAppSettings();
  const searchParams = useSearchParams();
  // State for filters
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("property_type") || "for-sale",
  );
  const [statusType, setStatusType] = useState<string>(
    searchParams.get("status") || "all",
  );
  const [minPrice, setMinPrice] = useState<number | null>(
    searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : null,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : null,
  );
  const [minArea, setMinArea] = useState<number | null>(
    searchParams.get("areaMin") ? Number(searchParams.get("areaMin")) : null,
  );
  const [maxArea, setMaxArea] = useState<number | null>(
    searchParams.get("areaMax") ? Number(searchParams.get("areaMax")) : null,
  );
  const [bedrooms, setBedrooms] = useState<string>(
    searchParams.get("bedrooms") || "all",
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || [],
  );
  const [selectedRoombath, setSelectedRoombath] = useState<string[]>(
    searchParams.get("room_bath")?.split(",").filter(Boolean) || [],
  );
  const [rentalPeriodType, setRentalPeriodType] = useState<string>(
    searchParams.get("rental_Period") || "all",
  );
  const [keywords, setKeywords] = useState<string[]>(
    searchParams.get("keywords")?.split(",").filter(Boolean) || [],
  );

  // Initialize state from URL params
  const [filters, setFilters] = useState<Filters>({
    downPayment: {
      option: searchParams.get("down_payment_option") || null,
      min: searchParams.get("down_payment_min")
        ? Number(searchParams.get("down_payment_min"))
        : null,
      max: searchParams.get("down_payment_max")
        ? Number(searchParams.get("down_payment_max"))
        : null,
    },
    price: {
      option: searchParams.get("price_option") || null,
      min: searchParams.get("price_min")
        ? Number(searchParams.get("price_min"))
        : null,
      max: searchParams.get("price_max")
        ? Number(searchParams.get("price_max"))
        : null,
    },
    area: {
      option: searchParams.get("area_option") || null,
      min: searchParams.get("area_min")
        ? Number(searchParams.get("area_min"))
        : null,
      max: searchParams.get("area_max")
        ? Number(searchParams.get("area_max"))
        : null,
    },
    keywords: searchParams.get("keywords")
      ? searchParams.get("keywords")!.split(",")
      : [],
    agentType: searchParams.get("agent_type") || null,
  });

  const categories = [
    {
      title: "تجاري",
      options: [
        { id: "industrial", label: "صناعي" },
        { id: "commercial-land", label: "أرض تجارية" },
        { id: "pharmacy", label: "صيدلية" },
        { id: "roof", label: "سطح" },
      ],
    },
    {
      title: "سكني",
      options: [
        { id: "office", label: "مكتب" },
        { id: "clinic", label: "عيادة" },
        { id: "warehouse", label: "مستودع" },
        { id: "store", label: "محل تجاري" },
      ],
    },
  ];

  const rentalPeriods: OptionType[] = [
    { value: "all", label: "جميع الفترات" },
    { value: "daily", label: "يومي" },
    { value: "weekly", label: "أسبوعي" },
    { value: "monthly", label: "شهري" },
    { value: "yearly", label: "سنوي" },
  ];

  const roomBathOptions: OptionGroup[] = [
    {
      label: "عدد الغرف",
      options: [
        { value: "1-room", label: "1 غرفة", isRoom: true },
        { value: "2-room", label: "2 غرف", isRoom: true },
        { value: "3-room", label: "3 غرف", isRoom: true },
        { value: "4-room", label: "4 غرف", isRoom: true },
        { value: "5-room", label: "5 غرف", isRoom: true },
        { value: "6-room", label: "+6 غرف", isRoom: true },
        { value: "studio", label: "استوديو", isRoom: true },
      ],
    },
    {
      label: "عدد الحمامات",
      options: [
        { value: "1-bathroom", label: "1 حمام", isBathroom: true },
        { value: "2-bathroom", label: "2 حمام", isBathroom: true },
        { value: "3-bathroom", label: "3 حمام", isBathroom: true },
        { value: "4-bathroom", label: "4 حمام", isBathroom: true },
        { value: "5-bathroom", label: "5 حمام", isBathroom: true },
        { value: "6-bathroom", label: "+6 حمام", isBathroom: true },
      ],
    },
  ];

  const StatusOptions: OptionType[] = [
    { label: "الجميع", value: "all" },
    { label: "قيد الإنشاء", value: "draft" },
    { label: "جاهز", value: "published" },
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedLocation) {
      params.set("location", selectedLocation.name || "");
      params.set("region", selectedLocation.region || "");
    } else {
      params.delete("location");
      params.delete("region");
    }

    if (statusType !== "all") params.set("status", statusType);

    if (propertyType !== "for-sale") {
      params.set("property_type", propertyType);
    } else {
      params.delete("property_type");
    }

    if (minPrice !== null) {
      params.set("priceMin", minPrice.toString());
    } else {
      params.delete("priceMin");
    }

    if (maxPrice !== null) {
      params.set("priceMax", maxPrice.toString());
    } else {
      params.delete("priceMax");
    }

    if (minArea !== null) {
      params.set("areaMin", minArea.toString());
    } else {
      params.delete("areaMin");
    }

    if (rentalPeriodType !== "all")
      params.set("rental_Period", rentalPeriodType);

    if (maxArea !== null) {
      params.set("areaMax", maxArea.toString());
    } else {
      params.delete("areaMax");
    }

    if (bedrooms !== "all") {
      params.set("bedrooms", bedrooms);
    } else {
      params.delete("bedrooms");
    }

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    if (selectedRoombath.length > 0) {
      params.set("room_bath", selectedRoombath.join(","));
    } else {
      params.delete("room_bath");
    }

    if (keywords.length > 0) {
      params.set("keywords", keywords.join(","));
    } else {
      params.delete("keywords");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    selectedLocation,
    propertyType,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedrooms,
    selectedCategories,
    selectedRoombath,
    pathname,
    router,
    searchParams,
    statusType,
    keywords,
    rentalPeriodType,
  ]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);

    // Update URL with new filters
    const params = new URLSearchParams();

    if (newFilters.downPayment?.option) {
      params.set("down_payment_option", newFilters.downPayment.option);
    }
    if (newFilters.downPayment?.min) {
      params.set("down_payment_min", newFilters.downPayment.min.toString());
    }
    if (newFilters.downPayment?.max) {
      params.set("down_payment_max", newFilters.downPayment.max.toString());
    }

    if (newFilters.price?.option) {
      params.set("price_option", newFilters.price.option);
    }
    if (newFilters.price?.min) {
      params.set("price_min", newFilters.price.min.toString());
    }
    if (newFilters.price?.max) {
      params.set("price_max", newFilters.price.max.toString());
    }

    if (newFilters.area?.option) {
      params.set("area_option", newFilters.area.option);
    }
    if (newFilters.area?.min) {
      params.set("area_min", newFilters.area.min.toString());
    }
    if (newFilters.area?.max) {
      params.set("area_max", newFilters.area.max.toString());
    }

    if (newFilters.keywords && newFilters.keywords.length > 0) {
      params.set("keywords", newFilters.keywords.join(","));
    } else {
      params.delete("keywords");
    }

    if (newFilters.agentType) {
      params.set("agent_type", newFilters.agentType);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleApplyPriceRange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const clearFilters = () => {
    // إعادة تعيين فلاتر الموقع وأنواع العقارات
    setSelectedLocation(null);
    setPropertyType("for-sale");
    setStatusType("all");
    setRentalPeriodType("all");

    // إعادة تعيين نطاقات السعر والمساحة
    setMinPrice(null);
    setMaxPrice(null);
    setMinArea(null);
    setMaxArea(null);

    // إعادة تعيين خيارات الغرف والفئات
    setBedrooms("all");
    setSelectedCategories([]);
    setSelectedRoombath([]);
    setKeywords([]);

    // إعادة تعيين الفلاتر المتقدمة
    setFilters({
      downPayment: { option: null, min: null, max: null },
      price: { option: null, min: null, max: null },
      area: { option: null, min: null, max: null },
      keywords: [],
      agentType: null,
    });

    // إزالة جميع الباراميترات من الرابط (URL)
    const cleanUrl = `${pathname}`;
    router.replace(cleanUrl);
  };

  return (
    <div className="bg-white py-4">
      {/* 2. Location Search */}
      <div className="mb-4 block md:hidden">
        <LocationSearch
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
      <div className="no-scrollbar overflow-x-auto md:overflow-x-visible">
        <div
          className={`mb-4 grid min-w-[1440px] ${propertyType === "for-sale" ? "grid-cols-5" : "grid-cols-6"} gap-3 md:min-w-[400px] md:grid-cols-2 lg:grid-cols-8`}
        >
          {/* 1. Tab Switcher */}
          <div className="lg:col-span-1">
            <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 p-1">
              <button
                type="button"
                onClick={() => setPropertyType("for-sale")}
                className={`w-full rounded-md px-4 py-2 text-sm ${
                  propertyType === "for-sale"
                    ? "bg-main-transparent text-main"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                للبيع
              </button>
              <button
                type="button"
                onClick={() => setPropertyType("for-rent")}
                className={`w-full rounded-md px-4 py-2 text-sm ${
                  propertyType === "for-rent"
                    ? "bg-main-transparent text-main"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                للأجار
              </button>
            </div>
          </div>

          {/* 2. Location Search */}
          <div className="hidden sm:col-span-1 md:block lg:col-span-2">
            <LocationSearch
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>

          {/* 3. Status Type */}
          {propertyType === "for-sale" && (
            <div className="lg:col-span-2">
              <StatusTabSelect
                options={StatusOptions}
                onChange={setStatusType}
                className="w-full justify-between p-2"
              />
            </div>
          )}

          {/* 4. Categories */}
          <div className="lg:col-span-1">
            <MultiSelectDropdown
              categories={categories}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
              className="!py-3.5"
            />
          </div>

          {/* 5. Rooms & Bathrooms */}
          <div className="lg:col-span-1">
            <MultiChoiceDropdown
              id="rooms-bathrooms"
              label="الغرف والحمامات"
              optionGroups={roomBathOptions}
              selectedValues={selectedRoombath}
              onChange={setSelectedRoombath}
              placeholder="اختر عدد الغرف والحمامات"
              autoMatchBathrooms
              className="!py-3.5"
            />
          </div>

          {/* 6. Price Dropdown */}
          {propertyType === "for-rent" && (
            <div className="lg:col-span-1">
              <RangeDropdown
                id="price-dropdown"
                title={`السعر (${settings.currency})`}
                onApply={handleApplyPriceRange}
                initialMin={minPrice}
                initialMax={maxPrice}
                minPlaceholder="أقل سعر"
                maxPlaceholder="أعلى سعر"
                className="!py-3.5"
              />
            </div>
          )}

          {/* 7. Advanced Filters */}
          <div className="lg:col-span-1">
            <AdvancedSearchDropdown
              initialDownPayment={filters.downPayment}
              initialPrice={filters.price}
              initialArea={filters.area}
              initialAgentType={filters.agentType}
              onFilterChange={handleFilterChange}
              className="!py-3.5"
            />
          </div>
          {/* 8. Rental Period */}
          {propertyType === "for-rent" && (
            <div className="lg:col-span-1">
              <ArabicDropdown
                id="rentalPeriodType"
                options={rentalPeriods}
                value={rentalPeriodType}
                onChange={setRentalPeriodType}
                className="!py-3.5"
                icon={<Clock className="h-3 w-3" />}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div></div>
        <button onClick={clearFilters} className="text-sm text-main transition">
          مسح عوامل التصفية
        </button>
      </div>
    </div>
  );
}
