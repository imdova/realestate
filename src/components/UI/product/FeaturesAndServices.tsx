"use client";

import { JSX, useState } from "react";
import {
  X,
  Car,
  Shield,
  Wifi,
  Waves,
  TreePalm,
  Utensils,
  Dumbbell,
  Snowflake,
  Sun,
  ArrowBigUp,
} from "lucide-react";

interface FeaturesAndServicesProps {
  amenities: string[];
}

// Map amenities to their corresponding icons
const getAmenityIcon = (amenity: string) => {
  const iconMap: Record<string, JSX.Element> = {
    جراج: <Car className="h-5 w-5 text-main" />,
    "أمن 24 ساعة": <Shield className="h-5 w-5 text-main" />,
    "انترنت فايبر": <Wifi className="h-5 w-5 text-main" />,
    مسبح: <Waves className="h-5 w-5 text-main" />,
    حديقة: <TreePalm className="h-5 w-5 text-main" />,
    مطعم: <Utensils className="h-5 w-5 text-main" />,
    "صالة ألعاب": <Dumbbell className="h-5 w-5 text-main" />,
    تكييف: <Snowflake className="h-5 w-5 text-main" />,
    تدفئة: <Sun className="h-5 w-5 text-main" />,
    مصعد: <ArrowBigUp className="h-5 w-5 text-main" />,
    جيم: <Dumbbell className="h-5 w-5 text-main" />,
  };

  return (
    iconMap[amenity] || (
      <div className="mr-2 h-2 w-2 rounded-full bg-main"></div>
    )
  );
};

export default function FeaturesAndServices({
  amenities,
}: FeaturesAndServicesProps) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const displayedAmenities = showAllAmenities
    ? amenities
    : amenities.slice(0, 6);

  return (
    <div className="py-6">
      {/* Header */}
      <h2 className="mb-4 text-xl font-bold text-gray-900">المزايا والخدمات</h2>

      {/* Amenities Grid */}
      <div className="flex gap-3 md:hidden">
        {displayedAmenities.slice(0, 2).map((amenity, index) => (
          <div
            key={index}
            className="flex h-32 w-full flex-col items-center justify-center gap-2 bg-gray-100"
          >
            {getAmenityIcon(amenity)}
            <span className="text-xs font-semibold text-gray-700">
              {amenity}
            </span>
          </div>
        ))}
        {amenities.length > 2 && (
          <button
            className="flex h-32 w-full flex-col items-center justify-center gap-2 border border-gray-300 text-xs"
            onClick={() => setShowAllAmenities(!showAllAmenities)}
          >
            +{amenities.length - 2} مزايا وخدمات
          </button>
        )}
      </div>
      {/* Amenities Grid */}
      <div className="hidden gap-3 md:flex">
        {displayedAmenities.map((amenity, index) => (
          <div
            key={index}
            className="flex h-32 w-full max-w-[200px] flex-col items-center justify-center gap-2 bg-gray-100"
          >
            {getAmenityIcon(amenity)}
            <span className="text-sm font-semibold text-gray-700">
              {amenity}
            </span>
          </div>
        ))}
        {amenities.length > 6 && (
          <button
            className="flex h-32 w-full flex-col items-center justify-center gap-2 border border-gray-300 text-sm"
            onClick={() => setShowAllAmenities(!showAllAmenities)}
          >
            +{amenities.length - 6} مزايا وخدمات
          </button>
        )}
      </div>

      {/* Full Amenities Modal */}
      {showAllAmenities && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-gray-900">
                جميع المزايا والخدمات
              </h3>
              <button
                onClick={() => setShowAllAmenities(false)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Amenities List */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex h-32 w-full flex-col items-center justify-center gap-2 bg-gray-100"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="text-sm font-semibold text-gray-700">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowAllAmenities(false)}
                className="rounded-lg bg-main px-6 py-2 font-medium text-white hover:bg-main-dark"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
