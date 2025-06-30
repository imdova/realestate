"use client";

import { useEffect, useState } from "react";
import RealEstateCard from "../cards/RealEstateCard";
import Pagination from "../Pagination";
import { RealEstateItem } from "@/types/real-estate";
import { realEstateData } from "@/constants/realestate";
import { useSearchParams } from "next/navigation";

export default function RealEstateSearch() {
  const [realEstates, setRealEstates] = useState<RealEstateItem[]>([]);
  const [totalPages, setTotalPages] = useState(10); // Set total pages to 10 for pagination
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRealEstates(realEstateData);
        setTotalPages(10); // Total pages for pagination
      } catch (error) {
        console.error("Error fetching real estates:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay
    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [searchParams]); // Still watch searchParams for potential filtering

  if (loading) return <div className="py-8 text-center">جاري التحميل...</div>;

  return (
    <div>
      {realEstates.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          لا توجد عقارات متاحة حالياً
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-3">
            {realEstates.map((property) => (
              <RealEstateCard key={property.id} {...property} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
