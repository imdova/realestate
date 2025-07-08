"use client";
import EmailContactForm from "@/components/forms/EmailContactForm";
import BrokerCard from "@/components/UI/cards/BrokerCard";
import RealEstateCard from "@/components/UI/cards/RealEstateCard";
import ArabicDropdown from "@/components/UI/Dropdown";
import LineTabs from "@/components/UI/LineTab";
import LocationSearch from "@/components/UI/LocationSearch";
import ContactUsModal from "@/components/UI/Modals/ContactUsModal";
import { MultiChoiceDropdown } from "@/components/UI/MultiChoiceDropdown";
import MultiSelectDropdown from "@/components/UI/MultiSelectDropdown";
import Pagination from "@/components/UI/Pagination";
import { RangeDropdown } from "@/components/UI/RangeDropdown";
import {
  MockAgency,
  mockBrokers,
  realEstateData,
} from "@/constants/realestate";
import { useAppSettings } from "@/hooks/useAppSettings";
import { ListFilter, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface AgencyProfilePageProps {
  params: Promise<{ slug: string }>;
}

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
type OptionType = {
  value: string;
  label: string;
};

const tabs = [{ label: "الاعلانات الفعاله" }, { label: "وكلاء العقارات" }];
const tabsMobile = [
  { label: "الملف" },
  { label: "الاعلانات الفعاله" },
  { label: "وكلاء العقارات" },
];

const sortsOptions: OptionType[] = [
  { value: "most_viewed", label: "الأكثر مشاهدة" },
  { value: "newest", label: "الأحدث" },
  { value: "highest_price", label: "الأعلى سعر" },
  { value: "lowest_price", label: "الأقل سعر" },
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

const AgencyProfileContent = ({ params }: AgencyProfilePageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const settings = useAppSettings();
  const pathname = usePathname();
  const [emailIsOpen, setEmailIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [tab, setTab] = useState("الاعلانات الفعاله");
  const [tabMobile, setTabMobile] = useState("الملف");
  // filters
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("property_type") || "for-sale",
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const [sortByType, setsortByType] = useState<string>(
    searchParams.get("sortby") || "all",
  );
  const [selectedRoombath, setSelectedRoombath] = useState<string[]>(
    searchParams.get("room_bath")?.split(",").filter(Boolean) || [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || [],
  );
  const [minPrice, setMinPrice] = useState<number | null>(
    searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : null,
  );
  const [maxPrice, setMaxPrice] = useState<number | null>(
    searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : null,
  );

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

    if (sortByType !== "all") params.set("sortby", sortByType);
    else params.delete("sortby");

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    selectedLocation,
    propertyType,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedRoombath,
    pathname,
    router,
    searchParams,
  ]);

  const { slug } = React.use(params);
  const agency = MockAgency.find((agency) => agency.id === slug);
  if (!agency) {
    return notFound();
  }
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const itemsPerPage = 10;
  const totalItems = realEstateData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // brokers
  const totalBroker = mockBrokers.length;
  const totalPagesBroker = Math.ceil(totalItems / itemsPerPage);

  const handleApplyPriceRange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div>
      <section>
        <div className="relative min-h-[280px] bg-gradient-to-r from-main-transparent from-10% via-white via-30% to-main-transparent to-90% py-2 md:py-8">
          <div className="container mx-auto px-4 lg:max-w-[1300px]">
            <div className="relative px-3 py-6 md:px-8">
              <div className="flex-col justify-between gap-6 md:flex lg:flex-row lg:items-end">
                <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-start">
                  <div className="flex gap-4">
                    <Image
                      className="h-[140px] w-[140px] rounded-lg object-cover md:h-[200px] md:w-[200px]"
                      src={agency?.logo ?? "/images/user-placholder.jpg"}
                      width={500}
                      height={500}
                      objectFit="cover"
                      alt={agency?.name ?? "logo"}
                    />
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="mb-2 rounded-lg bg-black/75 px-3 py-1 font-bold text-white">
                      {agency?.name}
                    </h2>
                    <p className="mb-2 w-fit rounded-lg bg-black/75 px-3 py-1 text-sm text-white">
                      {agency?.realestates} - عقارات
                    </p>
                  </div>
                </div>
                <div className="relative hidden items-center gap-3 md:flex">
                  {/* اتصل */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setContactIsOpen(true);
                    }}
                    className="flex items-center gap-1 rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-xs md:text-sm">اتصل</span>
                  </button>

                  {/* الإيميل */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEmailIsOpen(true);
                    }}
                    className="flex items-center gap-1 rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs md:text-sm">الإيميل</span>
                  </button>

                  {/* واتساب */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `https://wa.me/${agency?.phone.replace(/\D/g, "")}`,
                      );
                    }}
                    className="flex items-center gap-1 rounded-md bg-main-transparent fill-main px-3 py-1.5 text-sm text-main transition hover:bg-main hover:fill-white hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="18"
                      height="18"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fillRule="evenodd"
                        d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
                      ></path>
                    </svg>{" "}
                    <span className="text-xs md:text-sm">واتس اب</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden py-6 md:block">
        <div className="container mx-auto px-4 lg:max-w-[1300px]">
          <LineTabs tabs={tabs} activeTab={tab} onTabChange={setTab} />
          <div className="grid grid-cols-9 gap-4">
            <div className="col-span-6">
              {tab === "الاعلانات الفعاله" && (
                <div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
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
                    <div className="col-span-2">
                      <LocationSearch
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                      />
                    </div>
                    <MultiSelectDropdown
                      categories={categories}
                      selectedValues={selectedCategories}
                      onChange={setSelectedCategories}
                      className="!py-3.5"
                    />
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
                  <div className="my-6 flex justify-between gap-2">
                    <span>
                      عرض {currentPage} - {totalPagesBroker} من {totalBroker}{" "}
                      عقار مرتبة حسب
                    </span>
                    <div className="w-full max-w-[170px]">
                      {" "}
                      <ArabicDropdown
                        id="setsortByType"
                        options={sortsOptions}
                        value={sortByType}
                        onChange={setsortByType}
                        icon={<ListFilter className="h-3 w-3" />}
                      />
                    </div>
                  </div>
                  <div>
                    {realEstateData.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        لا توجد عقارات متاحة حالياً
                      </div>
                    ) : (
                      <>
                        <div className="mb-8 grid grid-cols-1 gap-3">
                          {realEstateData.map((property) => (
                            <RealEstateCard key={property.id} {...property} />
                          ))}
                        </div>

                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
              {tab === "وكلاء العقارات" && (
                <div>
                  <div>
                    {mockBrokers.length === 0 ? (
                      <div className="py-8 text-center text-gray-500">
                        لا توجد عقارات متاحة حالياً
                      </div>
                    ) : (
                      <>
                        <div className="mb-8 grid grid-cols-1 gap-3">
                          {mockBrokers.map((broker) => (
                            <BrokerCard broker={broker} key={broker.id} />
                          ))}
                        </div>

                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPagesBroker}
                        />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-3">
              <div>
                <div className="flex flex-col gap-3 p-3">
                  <h2 className="mb-3 text-xl font-bold">نبذة تعريفية</h2>
                  {agency.realestateType && (
                    <p className="text-sm">
                      <b>انواع العقارات: </b>{" "}
                      {agency.realestateType.join(" , ")}
                    </p>
                  )}
                  {agency.jurisdictioAreas && (
                    <p className="text-sm">
                      <b>مناطق الاختصاص: </b>{" "}
                      {agency.jurisdictioAreas.join(" , ")}
                    </p>
                  )}
                  {(agency.sale || agency.rent) && (
                    <p className="text-sm">
                      <b>عقارات: </b> {agency.sale && <>للبيع: {agency.sale}</>}{" "}
                      {"  "}{" "}
                      {agency.rent && (
                        <>
                          للايجار:
                          {agency.rent}
                        </>
                      )}
                    </p>
                  )}
                  {agency.description && (
                    <p className="text-sm">
                      <b>وصف العقار: </b>
                      {agency.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="block py-6 md:hidden">
        <div className="container mx-auto px-4 lg:max-w-[1300px]">
          <LineTabs
            tabs={tabsMobile}
            activeTab={tabMobile}
            onTabChange={setTabMobile}
          />
          <div>
            {tabMobile === "الملف" && (
              <div>
                <div className="flex flex-col gap-3 p-3">
                  <h2 className="mb-3 text-xl font-bold">نبذة تعريفية</h2>
                  {agency.realestateType && (
                    <p className="text-sm">
                      <b>انواع العقارات: </b>{" "}
                      {agency.realestateType.join(" , ")}
                    </p>
                  )}
                  {agency.jurisdictioAreas && (
                    <p className="text-sm">
                      <b>مناطق الاختصاص: </b>{" "}
                      {agency.jurisdictioAreas.join(" , ")}
                    </p>
                  )}
                  {(agency.sale || agency.rent) && (
                    <p className="text-sm">
                      <b>عقارات: </b> {agency.sale && <>للبيع: {agency.sale}</>}{" "}
                      {"  "}{" "}
                      {agency.rent && (
                        <>
                          للايجار:
                          {agency.rent}
                        </>
                      )}
                    </p>
                  )}
                  {agency.description && (
                    <p className="text-sm">
                      <b>وصف العقار: </b>
                      {agency.description}
                    </p>
                  )}
                </div>
              </div>
            )}
            {tabMobile === "الاعلانات الفعاله" && (
              <div className="col-span-7">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
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
                  <LocationSearch
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                  />
                  <MultiSelectDropdown
                    categories={categories}
                    selectedValues={selectedCategories}
                    onChange={setSelectedCategories}
                    className="!py-3.5"
                  />
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
                <div className="my-6 flex flex-col justify-between gap-4 sm:flex-row">
                  <span className="text-sm">
                    عرض {currentPage} - {totalPagesBroker} من {totalBroker} عقار
                    مرتبة حسب
                  </span>
                  <div className="w-full max-w-[170px]">
                    {" "}
                    <ArabicDropdown
                      id="setsortByType"
                      options={sortsOptions}
                      value={sortByType}
                      onChange={setsortByType}
                      icon={<ListFilter className="h-3 w-3" />}
                    />
                  </div>
                </div>
                <div>
                  {realEstateData.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      لا توجد عقارات متاحة حالياً
                    </div>
                  ) : (
                    <>
                      <div className="mb-8 grid grid-cols-1 gap-3">
                        {realEstateData.map((property) => (
                          <RealEstateCard key={property.id} {...property} />
                        ))}
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
            {tabMobile === "وكلاء العقارات" && (
              <div className="col-span-7">
                <div>
                  {mockBrokers.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                      لا توجد عقارات متاحة حالياً
                    </div>
                  ) : (
                    <>
                      <div className="mb-8 grid grid-cols-1 gap-3">
                        {mockBrokers.map((broker) => (
                          <BrokerCard broker={broker} key={broker.id} />
                        ))}
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPagesBroker}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <div
        className={`fixed bottom-0 z-50 flex w-full gap-2 border-t border-gray-200 bg-white p-4 shadow-md md:hidden`}
        dir="rtl"
      >
        <button
          onClick={() => setContactIsOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-main px-4 py-3 text-sm font-medium text-white hover:bg-main-dark"
        >
          <Phone className="h-4 w-4" />
          <span className="text-xs md:text-base">اتصل</span>
        </button>
        <button
          onClick={() => setEmailIsOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-main px-4 py-3 text-sm font-medium text-main hover:bg-gray-50"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs md:text-base">الايميل</span>
        </button>
        <Link
          href={`https://wa.me/${agency.phone.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1 space-x-reverse rounded-lg border border-main fill-main px-3 py-1 font-medium text-main"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="16"
            height="16"
            viewBox="0 0 32 32"
          >
            <path
              fillRule="evenodd"
              d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
            ></path>
          </svg>{" "}
          <span className="hidden text-xs sm:block md:text-base">واتس اب</span>
        </Link>
      </div>
      {/* المودالات */}
      <EmailContactForm
        isModalOpen={emailIsOpen}
        setIsModalOpen={setEmailIsOpen}
      />
      <ContactUsModal
        isOpen={contactIsOpen}
        onClose={() => setContactIsOpen(false)}
        referenceNumber="FixayX-1016"
        contactPerson={agency}
      />
    </div>
  );
};

const AgencyProfilePage = ({ params }: AgencyProfilePageProps) => {
  return (
    <Suspense>
      <AgencyProfileContent params={params} />
    </Suspense>
  );
};

export default AgencyProfilePage;
