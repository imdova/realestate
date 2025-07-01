import { useSearchParams, useRouter } from "next/navigation";
import { Clock, Percent } from "lucide-react";
import { useState, useEffect } from "react";
import ArabicDropdown from "./Dropdown";
import { StatusTabSelect } from "./StatusTabSelect";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { MultiChoiceDropdown } from "./MultiChoiceDropdown";
import { RangeDropdown } from "./RangeDropdown";
import { useAppSettings } from "@/hooks/useAppSettings";
import ProgressDropdown from "./ProgressDropdown";
import LocationSearch from "./LocationSearch";

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
interface Location {
  id: string;
  name: string;
  region?: string;
  parent?: string;
}

type TabType = "properties" | "new-projects";

const RealEstateSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const settings = useAppSettings();
  const [activeTab, setActiveTab] = useState<TabType>("properties");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  console.log(categoryIndex);

  const [PropertyType, setPropertyType] = useState<string>(
    searchParams.get("property_type") || "for-sale",
  );
  const [rentalPeriodType, setRentalPeriodType] = useState<string>(
    searchParams.get("rental_Period") || "all",
  );
  const [rentRateType, setRentRateType] = useState<string>("");
  const [deliveryTimeType, setDeliveryTimeType] = useState<string>(
    searchParams.get("deliveryTime") || "all",
  );
  const [statusType, setStatusType] = useState<string>(
    searchParams.get("status") || "all",
  );
  const [selectedRoombath, setSelectedRoombath] = useState<string[]>(
    searchParams.get("room_bath")?.split(",").filter(Boolean) || [],
  );
  const initialPriceParam = searchParams.get("price");
  const initialAreaParam = searchParams.get("area");
  const [minPrice, setMinPrice] = useState<number | null>(
    initialPriceParam ? Number(initialPriceParam.split(",")[0]) || null : null,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    initialPriceParam ? Number(initialPriceParam.split(",")[1]) || null : null,
  );
  const [minArea, setMinArea] = useState<number | null>(
    initialAreaParam ? Number(initialAreaParam.split(",")[0]) || null : null,
  );
  const [maxArea, setMaxArea] = useState<number | null>(
    initialAreaParam ? Number(initialAreaParam.split(",")[1]) || null : null,
  );
  const minRentRate = rentRateType
    ? Number(rentRateType.split("-")[0]) || ""
    : null;
  const maxRentRate = rentRateType
    ? Number(rentRateType.split("-")[1]) || ""
    : null;
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
  const deliveryTime: OptionType[] = [
    { value: "all", label: "الجميع" },
    { value: "two_for_2025", label: "الربع 2 من عام 2025" },
    { value: "three_for_2025", label: "الربع 3 من عام 2025" },
    { value: "four_for_2025", label: "الربع 4 من عام 2025" },
    { value: "one_for_2026", label: "الربع 1 من عام 2026" },
    { value: "two_for_2026", label: "الربع 2 من عام 2026" },
    { value: "three_for_2026", label: "الربع 3 من عام 2026" },
    { value: "four_for_2026", label: "الربع 4 من عام 2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
  ];
  const rentRate: OptionType[] = [
    { value: "all", label: "الجميع" },
    { value: "0-25", label: "0-25%" },
    { value: "25-50", label: "25-50%" },
    { value: "50-75", label: "50-75%" },
    { value: "75-100", label: "75-100%" },
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
    if (selectedLocation) params.set("location", selectedLocation.parent || "");
    if (selectedLocation) params.set("region", selectedLocation.region || "");
    if (progress) params.set("pre_handover_payment_max", progress.toString());
    if (statusType !== "all") params.set("status", statusType);
    if (deliveryTimeType !== "all")
      params.set("deliveryTime", deliveryTimeType);
    if (rentalPeriodType !== "all")
      params.set("rental_Period", rentalPeriodType);
    if (PropertyType !== "for-sale") params.set("property_type", PropertyType);
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
    if (minArea !== null || maxArea !== null) {
      params.set("area", `${minArea || ""},${maxArea || ""}`);
    } else {
      params.delete("price");
    }
    if (rentRateType !== "") {
      params.set("min_rent_rate", `${minRentRate || 0}`);
    }
    if (rentRateType !== "") {
      params.set("max_rent_rate", `${maxRentRate || 0}`);
    }
  }, [
    activeTab,
    PropertyType,
    statusType,
    rentalPeriodType,
    selectedCategories,
    selectedRoombath,
    minPrice,
    maxPrice,
    router,
    deliveryTimeType,
    maxArea,
    maxRentRate,
    minArea,
    minRentRate,
    progress,
    rentRateType,
    selectedLocation,
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search URL with all parameters
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (selectedLocation) params.set("location", selectedLocation.parent || "");
    if (selectedLocation) params.set("region", selectedLocation.region || "");
    if (statusType !== "all") params.set("status", statusType);
    if (deliveryTimeType !== "all")
      params.set("deliveryTime", deliveryTimeType);
    if (rentalPeriodType !== "all")
      params.set("rental_Period", rentalPeriodType);
    if (PropertyType !== "for-sale") params.set("property_type", PropertyType);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    }
    if (selectedRoombath.length > 0) {
      params.set("room_bath", selectedRoombath.join(","));
    }
    if (progress) params.set("pre_handover_payment_max", progress.toString());
    // Handle Price Range for search submission
    if (minPrice !== null) {
      params.set("min_price", `${minPrice || 0}`);
    }
    if (maxPrice !== null) {
      params.set("max_price", `${maxPrice || 0}`);
    }
    // Handle Area Range for search submission
    if (minArea !== null) {
      params.set("min_area", `${minArea || 0}`);
    }
    if (maxArea !== null) {
      params.set("max_area", `${maxArea || 0}`);
    }
    if (rentRateType !== "") {
      params.set("min_rent_rate", `${minRentRate || 0}`);
    }
    if (rentRateType !== "") {
      params.set("max_rent_rate", `${maxRentRate || 0}`);
    }
    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  };

  const handleApplyPriceRange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  const handleApplyAreaRange = (min: number | null, max: number | null) => {
    setMinArea(min);
    setMaxArea(max);
  };

  return (
    <div className="relative flex h-[600px] w-full items-center justify-center rounded-lg bg-[url(/images/building.jpg)] bg-cover p-4 md:p-6">
      <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-black/40"></div>
      <div className="relative mx-auto h-fit w-full max-w-4xl">
        <h1 className="mb-4 text-center text-xl font-bold text-white md:mb-6 md:text-2xl">
          استكشف بيتك الجديد للبيع او الايجار
        </h1>

        <div className="mx-auto mb-4 flex w-fit justify-center gap-2 rounded-md bg-white p-2 md:mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("properties")}
            className={`rounded-md px-3 py-1 text-sm md:px-4 md:py-2 md:text-base ${
              activeTab === "properties"
                ? "bg-main-transparent font-bold text-main"
                : "text-gray-800"
            }`}
          >
            عقارات
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("new-projects")}
            className={`relative rounded-md px-3 py-1 text-sm md:px-4 md:py-2 md:text-base ${
              activeTab === "new-projects"
                ? "bg-main-transparent font-bold text-main"
                : "text-gray-800"
            }`}
          >
            المشاريع الجديدة
            <span className="absolute -left-2 -top-4 flex h-5 w-10 items-center justify-center rounded-full bg-[#f73131] text-[10px] font-semibold text-white">
              جديد
            </span>
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full space-y-4 rounded-lg bg-white p-4 shadow-md"
        >
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            {activeTab === "properties" && (
              <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 p-1 sm:w-fit">
                <button
                  type="button"
                  onClick={() => setPropertyType("for-sale")}
                  className={`w-full rounded-md px-4 py-2 text-sm ${
                    PropertyType === "for-sale"
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
                    PropertyType === "for-rent"
                      ? "bg-main-transparent text-main"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  للأجار
                </button>
              </div>
            )}
            <div className="relative w-full flex-1 sm:w-fit">
              <LocationSearch
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
            <button
              type="submit"
              className="w-full min-w-[150px] rounded-md bg-main px-4 py-2.5 text-sm font-medium text-white hover:bg-main focus:outline-none sm:w-fit md:text-base"
            >
              بحث
            </button>
          </div>

          <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-2 md:gap-2 lg:grid-cols-4">
            {activeTab === "properties" ? (
              <>
                {PropertyType === "for-sale" ? (
                  <StatusTabSelect
                    options={StatusOptions}
                    onChange={setStatusType}
                    className="p-0.5"
                  />
                ) : (
                  <ArabicDropdown
                    id="rentalPeriodType"
                    options={rentalPeriods}
                    value={rentalPeriodType}
                    onChange={setRentalPeriodType}
                    icon={<Clock className="h-3 w-3" />}
                  />
                )}
                <MultiSelectDropdown
                  categories={categories}
                  selectedValues={selectedCategories}
                  onChange={setSelectedCategories}
                  setCategoryActive={setCategoryIndex}
                />
                {categoryIndex === 0 ? (
                  <MultiChoiceDropdown
                    id="rooms-bathrooms"
                    label="الغرف والحمامات"
                    optionGroups={roomBathOptions}
                    selectedValues={selectedRoombath}
                    onChange={setSelectedRoombath}
                    placeholder="اختر عدد الغرف والحمامات"
                    autoMatchBathrooms
                  />
                ) : (
                  <RangeDropdown
                    id="area-dropdown"
                    title={`المساحة (${settings.areaUnit})`}
                    onApply={handleApplyAreaRange}
                    initialMin={minArea}
                    initialMax={maxArea}
                    minPlaceholder="أقل مساحة"
                    maxPlaceholder="أعلى مساحة"
                  />
                )}

                {/* Price Dropdown */}
                <RangeDropdown
                  id="price-dropdown"
                  title={`السعر (${settings.currency})`}
                  onApply={handleApplyPriceRange}
                  initialMin={minPrice}
                  initialMax={maxPrice}
                  minPlaceholder="أقل سعر"
                  maxPlaceholder="أعلى سعر"
                />
              </>
            ) : (
              <>
                <MultiSelectDropdown
                  categories={categories}
                  selectedValues={selectedCategories}
                  onChange={setSelectedCategories}
                />
                <ArabicDropdown
                  id="deliveryTimeType"
                  insideLabel="التسليم في"
                  options={deliveryTime}
                  value={deliveryTimeType}
                  onChange={setDeliveryTimeType}
                  icon={<Clock className="h-3 w-3" />}
                />
                <ProgressDropdown
                  label="خطة السداد"
                  progress={progress}
                  setProgress={setProgress}
                />
                <ArabicDropdown
                  id="rentRateType"
                  options={rentRate}
                  value={rentRateType}
                  onChange={setRentRateType}
                  icon={<Percent className="h-3 w-3" />}
                />
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealEstateSearch;
