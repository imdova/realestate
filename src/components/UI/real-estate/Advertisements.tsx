import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Truck } from "lucide-react";
import AdBanner from "../AdBanner";

type Ad = {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  url: string;
  label?: string;
};

export default function Advertisements() {
  const ads: Ad[] = [
    {
      id: 1,
      title: "أوجد عقارات وفقاً لمدة القيادة",
      description: "جديد",
      imageUrl: "/images/ads-1.svg",
      url: "#",
      label: "جديد",
    },
  ];

  const suggestedResults = [
    "عقارات استوديو للبيع في مصر",
    "عقارات 1 غرفة نوم للبيع في مصر",
    "عقارات 2 غرفة نوم للبيع في مصر",
    "عقارات 3 غرفة نوم للبيع في مصر",
    "عقارات 4 غرفة نوم للبيع في مصر",
    "عقارات 5 غرفة نوم للبيع في مصر",
    "عقارات دوبلكس للبيع في مصر",
    "عقارات بحديقة للبيع في مصر",
  ];

  const usefulLinks = [{ label: "عقارات للإيجار في مصر", url: "#" }];

  const defaultVisible = 5;
  const [visibleCount, setVisibleCount] = useState(defaultVisible);
  const isExpanded = visibleCount >= suggestedResults.length;

  const toggleResults = () => {
    setVisibleCount(isExpanded ? defaultVisible : suggestedResults.length);
  };

  return (
    <div className="space-y-6 py-4">
      {/* إعلان */}
      {ads.map((ad) => (
        <div key={ad.id} className="overflow-hidden rounded-md">
          <div className="relative h-40 w-full">
            <Image
              src={ad.imageUrl}
              alt={ad.title}
              fill
              className="object-cover"
            />
            {ad.label && (
              <div className="absolute right-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                {ad.label}
              </div>
            )}
            <Link
              href="#"
              className="absolute bottom-4 left-1/2 min-w-[250px] -translate-x-1/2 rounded-md bg-white p-1 text-center"
            >
              <h3 className="flex items-center justify-center gap-1 text-sm font-semibold text-main">
                <Truck size={16} /> {ad.title}
              </h3>
            </Link>
          </div>
        </div>
      ))}

      {/* تنبيه */}
      <div className="rounded-lg p-3 text-center">
        <p className="text-sm text-gray-600">
          كن أول من يعلم عن العقارات الجديدة
        </p>
        <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-main px-4 py-2 text-sm font-medium text-main transition hover:bg-main-transparent">
          <Bell className="h-4 w-4" />
          أعلمني عن العقارات الجديدة
        </button>
      </div>

      {/* نتائج مقترحة */}
      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">نتائج مقترحة</h4>
        <ul className="space-y-1 text-sm text-main">
          {suggestedResults.slice(0, visibleCount).map((item, index) => (
            <li key={index}>
              <Link href="#" className="hover:underline">
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* عرض المزيد / عرض أقل */}
        {suggestedResults.length > defaultVisible && (
          <button
            onClick={toggleResults}
            className="mt-2 text-sm font-medium text-main-dark hover:underline"
          >
            {isExpanded ? "عرض أقل" : "عرض المزيد"}
          </button>
        )}
      </div>

      {/* روابط مفيدة */}
      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-700">روابط مفيدة</h4>
        <ul className="space-y-1 text-sm text-main">
          {usefulLinks.map((link, i) => (
            <li key={i}>
              <Link href={link.url} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/*  إعلان صورة */}
      <AdBanner
        imageUrl="https://tpc.googlesyndication.com/simgad/8887318428700452890"
        targetUrl="/promotions/summer-sale"
        altText="Summer property sale"
      />
      <AdBanner
        imageUrl="https://tpc.googlesyndication.com/simgad/4679872768599874101"
        targetUrl="/promotions/summer-sale"
        altText="Summer property sale"
      />
    </div>
  );
}
