"use client";
import {
  Bath,
  Banknote,
  Heart,
  Share,
  BedSingle,
  Grid2X2,
  ChevronRight,
} from "lucide-react";
import { RealEstateItem, rentalTerm } from "@/types/real-estate";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useEffect, useState } from "react";
import { formatArabicDate } from "@/util";
import FeaturesAndServices from "./FeaturesAndServices";
import PriceTrendChart from "../charts/PriceTrendChart";
import ComparativeAnalysis from "./ComparativeAnalysis";
import MortgageCalculator from "./MortgageCalculator";
import PropertyModal from "../Modals/PropertyModal";
import Image from "next/image";
import { realEstateData } from "@/constants/realestate";
import RealEstateCardTwo from "../cards/RealEstateCardTwo";
import AgentCard from "./AgentCard";

interface realestateDetailsProps {
  realestate: RealEstateItem;
  registerSectionRef: (id: string, element: HTMLElement | null) => void;
  activeTab?: string;
}

export default function RealestateDetails({
  realestate,
  registerSectionRef,
}: realestateDetailsProps) {
  const { formatCurrency, formatArea, currencyCode } = useAppSettings();
  const [expanded, setExpanded] = useState(false);
  const isLong = realestate.description.length > 150;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up refs when component unmounts
      registerSectionRef("تفاصيل", null);
      registerSectionRef("بحث شائع", null);
      registerSectionRef("المواقع والاماكن القريبة", null);
    };
  }, [registerSectionRef]);

  function getRentPriceByTerm(term?: rentalTerm): number | undefined {
    switch (term || realestate.rentalTerm) {
      case "يومي":
        return realestate.dayRent;
      case "أسبوعي":
        return realestate.weeklyRent;
      case "شهري":
        return realestate.monthlyRent;
      case "سنوي":
        return realestate.yearlyRent;
      default:
        return realestate.price;
    }
  }
  function getTitleByTerm(term?: rentalTerm): string | undefined {
    switch (term || realestate.rentalTerm) {
      case "يومي":
        return "يومياً";
      case "أسبوعي":
        return "أسبوعياً";
      case "شهري":
        return "شهرياً";
      case "سنوي":
        return "سنوياً";
      default:
        return;
    }
  }
  const realyPrice = getRentPriceByTerm();

  return (
    <div className="mb-6 p-0 sm:p-6">
      <section id="تفاصيل" ref={(el) => registerSectionRef("تفاصيل", el)}>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {formatCurrency(realyPrice || 0)}{" "}
              {getTitleByTerm(realestate.rentalTerm)}
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
        <div className="block md:hidden">
          <AgentCard agent={realestate.agent} />
        </div>
        <FeaturesAndServices amenities={realestate.amenities} />
      </section>
      <section
        id="بحث شائع"
        ref={(el) => registerSectionRef("بحث شائع", el)}
        className="mt-6 min-h-[80vh]"
      >
        <h2 className="my-4 text-2xl font-bold text-gray-800">البحث الشائع</h2>
        <PriceTrendChart
          prices={[
            65000000, 60000000, 55000000, 50000000, 45000000, 40000000,
            35000000,
          ]}
          months={[
            "يناير 2024",
            "فبراير 2024",
            "مارس 2024",
            "أبريل 2024",
            "مايو 2024",
            "يونيو 2024",
            "يوليو 2024",
          ]}
          title="مؤشر أسعار الصفقات"
          subtitle="عرض مؤشرات أسعار العقارات المشابهة"
          currency={currencyCode}
          showGradient={true}
        />
        <div className="mt-4">
          <ComparativeAnalysis
            ChartTitle="مقارنة معدل السعر/متر مربع*"
            ChartSubtitle="مع فيلات 4 غرفة نوم في العلمين"
            TableTitle="المواقع الأكثر بحثاً**"
            TableSubtitle="لشقق 4 غرفة نوم فيلات في الساحل الشمالي"
            data={[30000, 20000]}
          />
        </div>
        <div className="mt-6">
          <MortgageCalculator />
        </div>
      </section>
      <section
        id="المواقع والاماكن القريبة"
        className="mt-6"
        ref={(el) => registerSectionRef("المواقع والاماكن القريبة", el)}
      >
        <h2 className="my-4 text-2xl font-bold text-gray-800">
          الموقع والأماكن القريبة
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="max-w-[220px] overflow-hidden rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-blue-700"
        >
          <Image src={"/images/details.png"} width={300} height={300} alt="" />{" "}
          <div className="flex items-center justify-between gap-3 bg-white p-3">
            <ChevronRight size={14} /> الموقع
          </div>
        </button>{" "}
        {isModalOpen && (
          <PropertyModal
            property={realestate}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}{" "}
      </section>
      <div className="mt-6">
        <h2 className="mb-3 text-2xl font-bold">يُنصح به</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {realEstateData.slice(0, 3).map((realestate) => {
            return <RealEstateCardTwo key={realestate.id} {...realestate} />;
          })}
        </div>
      </div>
    </div>
  );
}
