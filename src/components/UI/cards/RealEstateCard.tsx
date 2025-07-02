import Image from "next/image";
import {
  Heart,
  Phone,
  ChevronLeft,
  ChevronRight,
  BedSingle,
  Bath,
  MapPin,
  Banknote,
  Mail,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  RealEstateItem,
  RealEstateStatus,
  rentalTerm,
} from "@/types/real-estate";
import { useAppSettings } from "@/hooks/useAppSettings";

export default function RealEstateCard({
  id,
  title,
  location,
  price,
  downPayment,
  area,
  bedrooms,
  bathrooms,
  images,
  status,
  type,
  dayRent,
  weeklyRent,
  monthlyRent,
  yearlyRent,
  rentalTerm,
}: RealEstateItem) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { formatCurrency, formatArea } = useAppSettings();

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (images?.length ?? 1) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (images?.length ?? 1) - 1 : prev - 1,
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  function getRentPriceByTerm(term?: rentalTerm): number | undefined {
    switch (term || rentalTerm) {
      case "يومي":
        return dayRent;
      case "أسبوعي":
        return weeklyRent;
      case "شهري":
        return monthlyRent;
      case "سنوي":
        return yearlyRent;
      default:
        return price;
    }
  }
  function getTitleByTerm(term?: rentalTerm): string | undefined {
    switch (term || rentalTerm) {
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
  console.log(realyPrice);
  const statusColorMap: Record<RealEstateStatus, string> = {
    مميز: "text-red-600 border-red-600 bg-red-50",
    استثنائي: "text-blue-600 border-blue-600 bg-blue-50",
    "افضل عقار لهذا الاسبوع": "text-green-600 border-green-600 bg-green-50",
  };

  return (
    <Link
      href={`/realestate-details/${id}`}
      dir="rtl"
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 lg:flex-row"
    >
      {/* Image Slider Section */}
      <div
        className="relative h-48 w-full overflow-hidden sm:h-56 lg:max-w-[300px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="block h-full w-full">
          <Image
            width={400}
            height={400}
            src={images?.[currentImageIndex] || "/images/placeholder.jpg"}
            alt={title}
            className="h-full w-full object-cover"
            priority={currentImageIndex === 0}
          />
        </div>

        {/* Favorite Button */}
        <button className="absolute left-2 top-2 rounded-full bg-white/80 p-2 backdrop-blur-sm">
          <Heart className="h-4 w-4 text-gray-700" />
        </button>

        {/* Navigation Arrows */}
        {(images?.length ?? 0) > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white transition duration-200 hover:bg-black/50 ${
                isHovered ? "opacity-100" : "md:opacity-0"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white transition duration-200 hover:bg-black/50 ${
                isHovered ? "opacity-100" : "md:opacity-0"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Thumbnail Indicators */}
        {(images?.length ?? 0) > 1 && (
          <div
            className={`absolute bottom-2 left-0 right-0 mx-auto flex w-fit justify-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm transition duration-300 ${
              isHovered ? "opacity-100" : "md:opacity-0"
            }`}
          >
            {images?.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  selectImage(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentImageIndex === index
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <span className="font-bold">
            {formatCurrency(realyPrice || 0)} {getTitleByTerm(rentalTerm)}
          </span>
          {status && (
            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusColorMap[status]}`}
            >
              {status}
            </span>
          )}
        </div>

        <div className="mb-3 flex font-semibold">
          <b className="border-l border-gray-200 pl-3 text-xs">{type}</b>
          <b className="flex items-center justify-center gap-1 border-l border-gray-200 px-3 text-xs">
            <BedSingle size={15} /> {bedrooms}
          </b>
          <b className="flex items-center justify-center gap-1 border-l border-gray-200 px-3 text-xs">
            <Bath size={15} /> {bathrooms}
          </b>
          <span className="flex items-center justify-center gap-1 px-3 text-xs">
            <b>المساحة:</b> {formatArea(area)}
          </span>
        </div>
        <h3 className="mb-2 text-sm font-semibold text-main">{title}</h3>
        <p className="mb-3 flex items-center gap-1 text-xs text-gray-600">
          <MapPin size={15} /> {location}
        </p>

        {downPayment && (
          <span className="mb-2 flex w-fit items-center gap-1 rounded-md bg-main-transparent px-2 py-1 text-[10px] text-main">
            <Banknote size={15} /> مقدم: {formatCurrency(downPayment)}{" "}
          </span>
        )}

        <div className="mt-auto flex items-center gap-3">
          <button className="flex items-center rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white">
            <Mail className="ml-1 h-4 w-4" />
            الايميل
          </button>
          <button className="flex items-center rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white">
            <Phone className="ml-1 h-4 w-4" />
            اتصل
          </button>
          <button className="flex items-center gap-1 rounded-md bg-main-transparent fill-main px-3 py-1.5 text-sm text-main transition hover:bg-main hover:fill-white hover:text-white">
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
            واتس اب
          </button>
        </div>
      </div>
    </Link>
  );
}
