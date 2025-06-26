import { useSearchParams, useRouter } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import ArabicDropdown from "./Dropdown";
import { StatusTabSelect } from "./StatusTabSelect";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { MultiChoiceDropdown } from "./MultiChoiceDropdown";
import { RangeDropdown } from "./RangeDropdown";

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

type TabType = "properties" | "new-projects";
type TabSubType = "for-sale" | "for-rent";

const RealEstateSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("properties");
  const [activeSubTab, setActiveSubTab] = useState<TabSubType>("for-sale");
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );
  const [rentalPeriodType, setRentalPeriodType] = useState<string>(
    searchParams.get("rental_Period") || "all",
  );
  const [statusType, setStatusType] = useState<string>(
    searchParams.get("status") || "all",
  );
  const [selectedRoombath, setSelectedRoombath] = useState<string[]>(
    searchParams.get("room_bath")?.split(",").filter(Boolean) || [],
  );
  const initialPriceParam = searchParams.get("price");
  const [minPrice, setMinPrice] = useState<number | null>(
    initialPriceParam ? Number(initialPriceParam.split(",")[0]) || null : null,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    initialPriceParam ? Number(initialPriceParam.split(",")[1]) || null : null,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || [],
  );

  const StatusOptions: OptionType[] = [
    { label: "الجميع", value: "all" },
    { label: "قيد الإنشاء", value: "draft" },
    { label: "جاهز", value: "published" },
  ];

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
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (searchQuery) params.set("query", searchQuery);
    if (statusType !== "all") params.set("status", statusType);
    if (rentalPeriodType !== "all")
      params.set("rental_Period", rentalPeriodType);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedRoombath.length > 0) {
      params.set("room_bath", selectedRoombath.join(","));
    }
    // Handle Price Range
    if (minPrice !== null || maxPrice !== null) {
      params.set("price", `${minPrice || ""},${maxPrice || ""}`);
    } else {
      params.delete("price");
    }
    // if (location) params.set("location", location);
  }, [
    activeTab,
    activeSubTab,
    searchQuery,
    statusType,
    rentalPeriodType,
    selectedCategories,
    selectedRoombath,
    minPrice, // Add minPrice to dependencies
    maxPrice, // Add maxPrice to dependencies
    router,
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search URL with all parameters
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (searchQuery) params.set("query", searchQuery);
    if (statusType !== "all") params.set("status", statusType);
    if (rentalPeriodType !== "all")
      params.set("rental_Period", rentalPeriodType);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedRoombath.length > 0) {
      params.set("room_bath", selectedRoombath.join(","));
    }
    // Handle Price Range for search submission
    if (minPrice !== null || maxPrice !== null) {
      params.set("price", `${minPrice || ""},${maxPrice || ""}`);
    }

    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  };

  const handleApplyPriceRange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="flex h-[450px] w-full items-center justify-center rounded-lg bg-[url(/images/house-key.jpg)] bg-cover bg-center p-4 brightness-90 md:p-6">
      <div className="mx-auto h-fit w-full max-w-4xl">
        <h1 className="mb-4 text-center text-xl font-bold text-white md:mb-6 md:text-2xl">
          استكشف بنك الجديد للبيع او الإيجار
        </h1>

        <div className="mb-4 flex justify-center gap-2 md:mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("properties")}
            className={`rounded-md px-3 py-1 text-sm md:px-4 md:py-2 md:text-base ${
              activeTab === "properties"
                ? "bg-main text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            عقارات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("new-projects")}
            className={`rounded-md px-3 py-1 text-sm md:px-4 md:py-2 md:text-base ${
              activeTab === "new-projects"
                ? "bg-main text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            المشاريع الجديدة
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full space-y-4 rounded-lg bg-white p-4 shadow-md"
        >
          <div className="flex items-center gap-2">
            {activeTab === "properties" && (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 p-1">
                <button
                  type="button"
                  onClick={() => setActiveSubTab("for-sale")}
                  className={`rounded-md text-sm md:px-4 md:py-2 ${
                    activeSubTab === "for-sale"
                      ? "bg-main-transparent text-main"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  للبيع
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab("for-rent")}
                  className={`rounded-md text-sm md:px-4 md:py-2 ${
                    activeSubTab === "for-rent"
                      ? "bg-main-transparent text-main"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  للأجار
                </button>
              </div>
            )}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <MapPin className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
              </div>
              <input
                type="text"
                placeholder="ادخل الموقع"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm leading-5 outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full min-w-[150px] rounded-md bg-main px-4 py-2.5 text-sm font-medium text-white hover:bg-main focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-base"
              >
                بحث
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 md:gap-2 lg:grid-cols-4">
            {activeTab === "properties" && (
              <>
                {activeSubTab === "for-sale" ? (
                  <StatusTabSelect
                    options={StatusOptions}
                    onChange={setStatusType}
                  />
                ) : (
                  <ArabicDropdown
                    id="rentalPeriodType"
                    options={rentalPeriods}
                    value={rentalPeriodType}
                    onChange={setRentalPeriodType}
                    icon={<Clock className="h-4 w-4" />}
                  />
                )}
              </>
            )}
            <MultiSelectDropdown
              categories={categories}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
            />
            <MultiChoiceDropdown
              id="rooms-bathrooms"
              label="الغرف والحمامات"
              optionGroups={roomBathOptions}
              selectedValues={selectedRoombath}
              onChange={setSelectedRoombath}
              placeholder="اختر عدد الغرف والحمامات"
              autoMatchBathrooms
            />
            {/* Price Dropdown */}
            <RangeDropdown
              id="price-dropdown"
              title="Price"
              onApply={handleApplyPriceRange}
              initialMin={minPrice}
              initialMax={maxPrice}
              minPlaceholder="أقل سعر"
              maxPlaceholder="أعلى سعر"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealEstateSearch;
