import React from "react";
import Link from "next/link";

interface LocationItem {
  id: string;
  name: string;
  region?: string;
  categories?: string[];
  for_rent?: boolean;
}

interface LocationGroup {
  title: string;
  locations: LocationItem[];
}

interface SimilarPropertiesProps {
  currentLocation: string;
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  currentLocation,
}) => {
  // Sample data - replace with your actual data source
  const locationGroups: LocationGroup[] = [
    {
      title: "عقارات مشابهة",
      locations: [
        { id: "1", name: "عقارات سكنية للبيع في مطروح", region: "مطروح" },
        {
          id: "2",
          name: "عقارات سكنية للبيع في الساحل الشمالي",
          region: "مطروح",
        },
        { id: "3", name: "عقارات سكنية للبيع في تودًا باي", region: "مطروح" },
      ],
    },
    {
      title: `بالقرب من ${currentLocation}`,
      locations: [
        {
          id: "4",
          name: "شاليهات سيزار باي",
          region: "مطروح",
          categories: ["industrial"],
          for_rent: true,
        },
        {
          id: "5",
          name: "شاليهات طوائن متوسط الساحل",
          region: "مطروح",
          categories: ["industrial", "pharmacy"],
        },
        {
          id: "6",
          name: "شاليهات سوان ليك",
          region: "مطروح",
          categories: ["industrial"],
        },
        {
          id: "7",
          name: "شاليهات راس الحكمة",
          region: "مطروح",
          categories: ["industrial"],
        },
        {
          id: "8",
          name: "شاليهات جيميزا باي",
          region: "مطروح",
          categories: ["industrial"],
        },
      ],
    },
    {
      title: "شاليهات في مناطق أخرى مجاورة",
      locations: [
        { id: "9", name: "شاليهات عجمي", region: "مطروح" },
        { id: "10", name: "شاليهات المصورة", region: "مطروح" },
        { id: "11", name: "شاليهات الشيخ زايد", region: "مطروح" },
        { id: "12", name: "سوق التجريب والفصلية", region: "مطروح" },
      ],
    },
  ];

  return (
    <div className="bg-white p-6">
      {locationGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className={groupIndex !== locationGroups.length - 1 ? "mb-8" : ""}
        >
          <h2 className="mb-3 bg-gray-50 p-2 font-bold text-gray-800">
            {group.title}
          </h2>
          <div className="flex flex-col gap-2">
            {group.locations.map((location) => (
              <Link
                key={location.id}
                href={`/search?location=${encodeURIComponent(location.name)}&region=${location.region}${location.categories ? `&categories=${location.categories?.join("%2C")}` : ""}${location.for_rent ? "&property_type=for-rent" : ""}`}
                className="text-sm text-gray-600 transition-colors hover:text-main hover:underline"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarProperties;
