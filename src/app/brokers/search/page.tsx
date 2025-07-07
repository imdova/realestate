"use client";

import EmailContactForm from "@/components/forms/EmailContactForm";
import BrokerCard from "@/components/UI/cards/BrokerCard";
import LocationSearch from "@/components/UI/LocationSearch";
import Pagination from "@/components/UI/Pagination";
import { MockAgency, mockBrokers } from "@/constants/realestate";
import { Gem, Home, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface Location {
  id: string;
  name: string;
  region?: string;
  parent?: string;
}

function BrokerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [emailIsOpen, setEmailIsOpen] = useState(false);

  // State for filters
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [propertyType, setPropertyType] = useState<string>(
    searchParams.get("property_type") || "for-sale",
  );
  const [type, setType] = useState<string>(
    searchParams.get("type") || "وكلاء-العقارات",
  );
  const [agentName, setAgentName] = useState<string>(
    searchParams.get("agent_name") || "",
  );
  const [agencyName, setAgencyName] = useState<string>(
    searchParams.get("agency_name") || "",
  );
  const [language, setLanguage] = useState<string>(
    searchParams.get("language") || "",
  );
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10),
  );

  // Calculate pagination values
  const itemsPerPage = 10;
  const totalItems = mockBrokers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedBrokers = mockBrokers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalItemsAgancy = MockAgency.length;
  const totalPagesAgancy = Math.ceil(totalItemsAgancy / itemsPerPage);
  const paginatedAgancy = MockAgency.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedLocation) {
      params.set("location", selectedLocation.name || "");
      params.set("region", selectedLocation.region || "");
    }

    params.set("type", type);
    params.set("page", currentPage.toString());

    if (type === "وكلاء-العقارات") {
      params.set("property_type", propertyType);
      if (agentName) params.set("agent_name", agentName);
    } else {
      if (agencyName) params.set("agency_name", agencyName);
    }

    if (language) params.set("language", language);

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    selectedLocation,
    propertyType,
    type,
    agentName,
    agencyName,
    language,
    currentPage,
    pathname,
    router,
  ]);

  const clearFilters = () => {
    setSelectedLocation(null);
    setPropertyType("for-sale");
    setType("وكلاء-العقارات");
    setAgentName("");
    setAgencyName("");
    setLanguage("");
    setCurrentPage(1);
    router.replace(pathname);
  };

  return (
    <div>
      <div className="top-0 z-10 overflow-x-auto border-y border-gray-200 bg-white py-6 md:overflow-x-visible lg:sticky">
        <div className="container mx-auto px-4 lg:max-w-[1300px]">
          {/* 2. Location Search */}
          <div className="mb-4 block md:hidden">
            <LocationSearch
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
          <div className="no-scrollbar overflow-x-auto md:overflow-x-visible">
            <div
              className={`mb-4 grid min-w-[1440px] ${
                type === "الشركات-العقارية"
                  ? "grid-cols-3 xl:grid-cols-6"
                  : "grid-cols-4 xl:grid-cols-7"
              } gap-3 md:min-w-[400px] md:grid-cols-2`}
            >
              {/* 1. Tab Switcher */}
              <div className="xl:col-span-2">
                <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 p-1">
                  <button
                    type="button"
                    onClick={() => setType("وكلاء-العقارات")}
                    className={`w-full rounded-md px-4 py-2 text-sm ${
                      type === "وكلاء-العقارات"
                        ? "bg-main-transparent text-main"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    وكلاء العقارات
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("الشركات-العقارية")}
                    className={`w-full rounded-md px-4 py-2 text-sm ${
                      type === "الشركات-العقارية"
                        ? "bg-main-transparent text-main"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    الشركات العقارية
                  </button>
                </div>
              </div>

              {type === "وكلاء-العقارات" && (
                <>
                  {/* 1. Tab Switcher */}
                  <div className="xl:col-span-1">
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
                </>
              )}

              {/* 2. Location Search */}
              <div className="hidden sm:col-span-1 md:block xl:col-span-2">
                <LocationSearch
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>

              {type === "وكلاء-العقارات" ? (
                <div>
                  <input
                    className="flex w-full cursor-text items-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none"
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="اسم الوكيل"
                  />
                </div>
              ) : (
                <div>
                  <input
                    className="flex w-full cursor-text items-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none"
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="اسم الوكالة"
                  />
                </div>
              )}

              <div>
                <input
                  className="flex w-full cursor-text items-center rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none"
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="ادخل اللغات"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={clearFilters}
              className="text-sm text-main transition"
            >
              مسح عوامل التصفية
            </button>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="container mx-auto px-4 lg:max-w-[1300px]">
          {type === "وكلاء-العقارات" ? (
            <div className="grid gap-4 md:grid-cols-9">
              <div className="md:col-span-5 lg:col-span-7">
                <div className="mb-6">
                  <h2 className="mb-2 text-xl font-bold">
                    وكلاء العقارات في مَصر
                  </h2>
                  <p className="mb-4 text-sm">
                    عرض {currentPage} - {totalPages} من {totalItems} الشركات
                    العقارية
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {paginatedBrokers.map((broker) => (
                    <BrokerCard key={broker.id} broker={broker} />
                  ))}
                </div>
                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  isRTL={true}
                />
              </div>
              <div className="md:col-span-4 lg:col-span-2">
                <div className="flex justify-center py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="110"
                    height="77"
                    fill="none"
                    viewBox="0 0 110 77"
                  >
                    <ellipse
                      cx="55.08"
                      cy="35.69"
                      fill="#6d0d57"
                      rx="27.71"
                      ry="27.71"
                    />
                    <path
                      fill="#6d0d57"
                      fillRule="evenodd"
                      d="M57.05 63.33L44.22 49.85 72.5 29.4l9.7 11.97a27.73 27.73 0 0 1-25.15 21.95z"
                      clipRule="evenodd"
                      opacity=".1"
                    />
                    <path
                      stroke="#6d0d57"
                      strokeLinecap="round"
                      strokeWidth="2.33"
                      d="M78.4 67.62A37.77 37.77 0 0 1 55 75.68c-9.1 0-17.44-3.2-23.98-8.54"
                    />
                    <path
                      fill="#6d0d57"
                      d="M84.75 64.64c.93-2.6 2.53-9.05-3.05-12.23 0 0-4.4 9.64 2.43 13.25 6.39 4.37 12.92-3.99 12.92-3.99-5.41-3.45-10.41.95-12.3 2.97z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M91.74 55c.07-2.5-.36-8.54-6.1-9.73 0 0-1.1 9.58 5.85 10.8 6.76 1.98 10.07-7.09 10.07-7.09-5.66-1.47-8.76 3.74-9.82 6.02z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M84.24 8.85s-3.55.65-6.02-5.04c0 0 4.65-.64 6.02 5.04z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M94.89 43.93c-.46-2.37-2.12-7.95-7.75-7.89 0 0 .95 9.24 7.73 8.94 6.77.48 8-8.72 8-8.72-5.63-.22-7.46 5.31-7.98 7.67z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M95.09 32.27c-.76-2.02-3.06-6.7-8.03-5.8 0 0 2.23 8.01 8.17 6.73 6.05-.6 5.75-8.9 5.75-8.9-5 .65-5.78 5.81-5.9 7.97z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M92.15 21.58c-1.15-1.53-4.27-4.93-8.27-2.92 0 0 3.9 6.25 8.63 3.68 4.99-2.02 2.65-9 2.65-9-4.08 1.8-3.46 6.38-3 8.24z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M87.12 13.23c-1.26-1.1-4.56-3.43-7.6-1 0 0 4.47 4.62 8.04 1.57 3.9-2.62.61-8.15.61-8.15-3.16 2.29-1.78 6.07-1.05 7.58z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M25.25 64.64c-.93-2.6-2.53-9.05 3.05-12.23 0 0 4.4 9.63-2.43 13.25-6.38 4.37-12.92-3.99-12.92-3.99 5.41-3.45 10.42.95 12.3 2.97z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M18.26 55c-.07-2.5.36-8.54 6.1-9.73 0 0 1.1 9.58-5.85 10.8-6.76 1.98-10.07-7.09-10.07-7.09 5.66-1.47 8.76 3.74 9.82 6.02z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M25.76 8.85s3.55.65 6.02-5.04c0 0-4.65-.64-6.02 5.04z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M15.12 43.93c.45-2.37 2.1-7.95 7.74-7.89 0 0-.95 9.24-7.73 8.94-6.77.48-8-8.72-8-8.72 5.63-.22 7.46 5.31 7.99 7.67z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M14.91 32.27c.76-2.02 3.06-6.7 8.03-5.8 0 0-2.23 8.01-8.17 6.73-6.05-.6-5.75-8.9-5.75-8.9 5 .65 5.78 5.81 5.9 7.97z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M17.85 21.58c1.15-1.53 4.27-4.93 8.27-2.92 0 0-3.9 6.25-8.63 3.67-4.99-2.01-2.65-9-2.65-9 4.08 1.8 3.46 6.39 3 8.25z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M22.88 13.22c1.26-1.1 4.56-3.42 7.6-.99 0 0-4.47 4.62-8.04 1.57-3.9-2.62-.61-8.15-.61-8.15 3.16 2.28 1.78 6.07 1.05 7.58z"
                    />
                    <path
                      fill="#6d0d57"
                      d="M54.15 17.78a1.16 1.16 0 0 1 2.09 0l4.47 9.02c.17.34.5.58.87.63l10 1.45a1.16 1.16 0 0 1 .64 1.98l-7.23 7.02a1.16 1.16 0 0 0-.33 1.03l1.7 9.9a1.16 1.16 0 0 1-1.68 1.23l-8.95-4.68a1.16 1.16 0 0 0-1.07 0l-8.95 4.68a1.16 1.16 0 0 1-1.69-1.23l1.7-9.9a1.16 1.16 0 0 0-.33-1.03l-7.22-7.02a1.16 1.16 0 0 1 .64-1.98l10-1.45c.37-.05.7-.29.87-.63l4.47-9.02z"
                    />
                    <polygon
                      points="55.08,25 57.91,32.1 65.52,32.88 59.8,37.95 61.55,45.44 55.08,41.3 48.61,45.44 50.36,37.95 44.64,32.88 52.25,32.1"
                      fill="#fff"
                    />
                  </svg>
                </div>

                <h2 className="mb-2 text-center text-xl font-bold">
                  كيف يكسب الوكلاء الشارات؟
                </h2>
                <p className="text-center text-sm">
                  لتسليط الضوء على الأداء الرائع، نكافئ الوكلاء بشارات مخصصة على
                  بيوت.
                </p>
                <div className="flex flex-col gap-3 py-4">
                  <div className="rounded-lg bg-main-transparent p-4">
                    <span className="mx-auto block w-fit rounded-lg bg-main px-3 py-1 font-bold text-white">
                      TruBroker™
                    </span>
                    <p className="mt-3 text-center text-sm text-main">
                      شارة حصرية تُمنح للوكلاء الذين يمتلكون نسب استجابة عالية
                      وينشرون عقارات حقيقية.
                    </p>
                  </div>
                  <div className="rounded-lg bg-main-transparent p-4">
                    <span className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-main px-3 py-1 text-sm font-bold text-white">
                      معلن بجودة عالية <Gem size={15} />
                    </span>
                    <p className="mt-3 text-center text-sm text-main">
                      أثبت الوكلاء الذين يحملون شارة معلن بجودة عالية أنهم
                      يقدمون إعلانات متاحة وعالية الجودة.
                    </p>
                  </div>
                  <div className="rounded-lg bg-main-transparent p-4">
                    <span className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-main px-3 py-1 text-sm font-bold text-white">
                      سريع الاستجابة <Phone size={15} />
                    </span>
                    <p className="mt-3 text-center text-sm text-main">
                      شارة حصرية تُمنح للوكلاء الذين يمتلكون نسب استجابة عالية
                      ويسهل الوصول إليهم.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="mb-2 text-xl font-bold">
                  الشركات العقارية في مَصر
                </h2>
                <p className="text-sm">
                  عرض {currentPage} - {totalPagesAgancy} من {totalItemsAgancy}{" "}
                  الشركات العقارية
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {paginatedAgancy.map((agency) => {
                  return (
                    <div
                      className="rounded-lg border border-gray-300"
                      key={agency.id}
                    >
                      <Link href="/sdfgs" passHref>
                        <div className="block">
                          <div className="flex items-center justify-center border-b border-gray-300 p-3">
                            <Image
                              className="h-[100px] w-[200px] object-cover"
                              src={agency.logo}
                              width={300}
                              height={300}
                              alt={agency.name}
                            />
                          </div>
                          <h2 className="border-b border-gray-300 p-3 text-center font-bold">
                            {agency.name}
                          </h2>
                          <h2 className="flex items-center justify-center gap-2 border-b border-gray-300 p-3 text-center text-xs">
                            <Home size={14} /> {agency.realestates} عقار
                          </h2>
                          <p className="border-b border-gray-300 p-3 text-xs">
                            <span className="text-xs font-bold">
                              مناطق الاختصاص:
                            </span>{" "}
                            {agency.jurisdictioAreas?.join(" , ")}
                          </p>
                        </div>
                      </Link>

                      <div className="p-3">
                        {/* Email button outside the Link */}
                        <button
                          onClick={() => setEmailIsOpen(true)}
                          className="flex w-full items-center justify-center gap-1 rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white"
                        >
                          <Mail className="h-3 w-3" />
                          <span className="text-xs md:text-sm">الإيميل</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPagesAgancy}
                isRTL={true}
              />
            </div>
          )}
        </div>
        <EmailContactForm
          isModalOpen={emailIsOpen}
          setIsModalOpen={setEmailIsOpen}
        />
      </div>
    </div>
  );
}

export default function BrokerSearchPage() {
  return (
    <Suspense>
      <BrokerContent />
    </Suspense>
  );
}
