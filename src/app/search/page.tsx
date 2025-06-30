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

function SearchContent() {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const [sortByType, setsortByType] = useState<string>(
    urlSearchParams.get("sortby") || "all",
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(urlSearchParams.toString());

    if (sortByType !== "all") params.set("sortby", sortByType);

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, urlSearchParams, sortByType]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:max-w-[1440px]">
        <div className="mb-3 border-b border-gray-200">
          <SearchFilters />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">عقارات للايجار في مَصر</h2>
          <div className="flex justify-between">
            <div className="w-full max-w-[200px]">
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
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="py-6">
              <RenderSearch />
            </div>
          </div>
          {/* Left Sidebar - Filters and Ads */}
          <div className="w-full space-y-6 md:w-1/4">
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
