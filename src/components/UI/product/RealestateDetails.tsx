"use client";
import { Bath, Banknote, Heart, Share, BedSingle, Grid2X2 } from "lucide-react";
import { RealEstateItem } from "@/types/real-estate";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useState } from "react";
import { formatArabicDate } from "@/util";
import FeaturesAndServices from "./FeaturesAndServices";

interface realestateDetailsProps {
  realestate: RealEstateItem;
}

export default function RealestateDetails({
  realestate,
}: realestateDetailsProps) {
  const { formatCurrency, formatArea } = useAppSettings();
  const [expanded, setExpanded] = useState(false);
  const isLong = realestate.description.length > 150;

  return (
    <div className="mb-6 p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {formatCurrency(realestate.price || 0)}
          </h1>
          {realestate.downPayment && (
            <span className="mb-2 flex w-fit items-center gap-1 rounded-md bg-main-transparent px-2 py-1 text-xs text-main">
              <Banknote size={16} /> مقدم:{" "}
              {formatCurrency(realestate.downPayment)}{" "}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md bg-main-transparent px-3 py-2 text-main transition hover:bg-main hover:text-white">
            حفظ <Heart size={16} />
          </button>
          <button className="flex items-center gap-2 rounded-md bg-main-transparent px-3 py-2 text-main transition hover:bg-main hover:text-white">
            شارك <Share size={16} />
          </button>
        </div>
      </div>
      <div className="my-3 mt-6 flex font-semibold">
        {realestate.bedrooms && (
          <b className="flex items-center justify-center gap-1 pl-3 text-xs sm:text-sm">
            <BedSingle size={15} /> {realestate.bedrooms} غرف
          </b>
        )}
        {realestate.bathrooms && (
          <b className="flex items-center justify-center gap-1 px-3 text-xs sm:text-sm">
            <Bath size={15} /> {realestate.bathrooms} حمامات
          </b>
        )}
        {realestate.area && (
          <span className="flex items-center justify-center gap-1 px-3 text-xs sm:text-sm">
            <Grid2X2 size={15} /> {formatArea(realestate.area)}
          </span>
        )}
      </div>
      <h1 className="mb-2 text-xl font-bold text-gray-900">
        {realestate.title}
      </h1>
      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        {expanded || !isLong
          ? realestate.description
          : `${realestate.description.slice(0, 150)}... `}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-main hover:underline focus:outline-none"
          >
            {expanded ? "عرض أقل" : "اقرأ المزيد"}
          </button>
        )}
      </p>
      <h1 className="mb-2 text-2xl font-bold">معلومات عن العقار</h1>
      <div className="grid max-w-2xl gap-4 gap-x-7 py-4 sm:grid-cols-2">
        {realestate.type && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>نوع العقار</h2>
            <p className="font-bold">{realestate.type}</p>
          </div>
        )}
        {realestate.construction && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>حالة البناء</h2>
            <p className="font-bold">{realestate.construction}</p>
          </div>
        )}
        {realestate.purpose && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>نوع العرض</h2>
            <p className="font-bold">{realestate.purpose}</p>
          </div>
        )}
        {realestate.furnishing && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>التأثيث</h2>
            <p className="font-bold">{realestate.furnishing}</p>
          </div>
        )}
        {realestate.reference_num && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>الرقم المرجعي</h2>
            <p className="font-bold">{realestate.reference_num}</p>
          </div>
        )}
        {realestate.createdAt && (
          <div className="flex items-center justify-between text-sm sm:text-base">
            <h2>تاريخ الإضافة</h2>
            <p className="font-bold">
              {formatArabicDate(realestate.createdAt)}
            </p>
          </div>
        )}
      </div>
      <FeaturesAndServices amenities={realestate.amenities} />
    </div>
  );
}
