"use client";

import SearchFilters from "@/components/filters/SearchFilters";
import ArabicDropdown from "@/components/UI/Dropdown";
import Advertisements from "@/components/UI/real-estate/Advertisements";
import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RenderSearch } from "./RenderSearch";

type OptionType = {
  value: string;
  label: string;
};

const sortsOptions: OptionType[] = [
  { value: "most_viewed", label: "الأكثر مشاهدة" },
  { value: "newest", label: "الأحدث" },
  { value: "highest_price", label: "الأعلى سعر" },
  { value: "lowest_price", label: "الأقل سعر" },
];
const furnishedOptions = [
  { value: "all", label: "جميع العقارات" },
  { value: "furnished", label: "المفروشة" },
  { value: "unfurnished", label: "غير المفروشة" },
];

function SearchContent() {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const [sortByType, setsortByType] = useState<string>(
    urlSearchParams.get("sortby") || "all",
  );

  const [furnishedFilter, setFurnishedFilter] = useState<string>(
    urlSearchParams.get("furnished") || "all",
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(urlSearchParams.toString());

    if (sortByType !== "all") params.set("sortby", sortByType);
    else params.delete("sortby");

    if (furnishedFilter !== "all") params.set("furnished", furnishedFilter);
    else params.delete("furnished");

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, urlSearchParams, sortByType, furnishedFilter]);

  return (
    <div>
      <div className="container mx-auto px-4 lg:max-w-[1300px]">
        <div className="sticky top-0 z-10 mb-3 border-b border-gray-200 md:relative lg:sticky">
          <SearchFilters />
        </div>

        <div className="grid gap-8 md:grid-cols-9">
          {/* Main Content */}
          <div className="md:col-span-5 lg:col-span-6 xl:col-span-7">
            <div>
              <h2 className="mb-4 text-xl font-bold">عقارات للايجار في مَصر</h2>
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                  {furnishedOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`rounded-lg border px-2 py-1.5 text-xs font-medium ${
                        furnishedFilter === option.value
                          ? "border-main bg-main-transparent text-main"
                          : "border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setFurnishedFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="w-full max-w-[100px] lg:max-w-[160px]">
                  <ArabicDropdown
                    id="setsortByType"
                    options={sortsOptions}
                    value={sortByType}
                    onChange={setsortByType}
                    icon={<ListFilter className="h-3 w-3" />}
                  />
                </div>
              </div>
            </div>
            <div className="py-6">
              <RenderSearch />
            </div>
          </div>
          {/* Left Sidebar - Filters and Ads */}
          <div className="space-y-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <Advertisements />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
