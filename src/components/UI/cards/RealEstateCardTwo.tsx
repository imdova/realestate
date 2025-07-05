import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  BedSingle,
  Bath,
  MapPin,
  Banknote,
} from "lucide-react";
import { useCallback, useState } from "react";
import Link from "next/link";
import {
  RealEstateItem,
  RealEstateStatus,
  rentalTerm,
} from "@/types/real-estate";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomAlert from "../CustomAlert";
import { useSession } from "next-auth/react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import WishlistButton from "../Buttons/WishlistButton";

export default function RealEstateCardTwo({
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
  description,
  yearBuilt,
  amenities,
  address,
  purpose,
  agent,
  details,
  videos,
  createdAt,
  nearbyPlaces,
}: RealEstateItem) {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info" | "cart" | "wishlist";
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { formatCurrency, formatArea } = useAppSettings();
  const { realestates: wishlistData } = useAppSelector(
    (state) => state.wishlist,
  );
  const session = useSession();
  const dispatch = useAppDispatch();

  const isInWishlist = wishlistData.some((item) => item.id === id);
  const userId = session.data?.user.id;

  // Show Alert Function
  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "cart" | "wishlist",
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3 seconds
  };

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

  const handdleAddToWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!userId) {
        // This should never happen since the button requires auth
        console.error("User ID is undefined");
        return;
      }

      try {
        if (!isInWishlist) {
          dispatch(
            addToWishlist(
              {
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
                description,
                yearBuilt,
                amenities,
                address,
                purpose,
                agent,
                details,
                videos,
                createdAt,
                nearbyPlaces,
              },
              userId,
            ),
          );
          showAlert("تمت الإضافة إلى قائمة الرغبات", "wishlist");
        } else {
          dispatch(
            removeFromWishlist({
              id: id,
              userId: userId,
            }),
          );
          showAlert("تمت الإزالة من قائمة الرغبات", "wishlist");
        }
      } catch (error) {
        console.error("Wishlist operation failed:", error);
        showAlert("فشل في تحديث قائمة الرغبات", "error");
      }
    },
    [dispatch, isInWishlist, userId],
  );

  return (
    <div className="relative">
      <div className="">
        {/* Favorite Button */}
        <WishlistButton
          isInWishlist={isInWishlist}
          productId={id}
          addToWishlist={handdleAddToWishlist}
        />
      </div>
      <div
        dir="rtl"
        className="group flex flex-col overflow-hidden bg-white transition-shadow duration-300"
      >
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        {/* Image Slider Section */}
        <div
          className="relative h-36 w-full overflow-hidden rounded-md lg:max-w-[300px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link
            href={`/realestate-details/${id}`}
            className="block h-full w-full"
          >
            <Image
              width={400}
              height={400}
              src={images?.[currentImageIndex] || "/images/placeholder.jpg"}
              alt={title}
              className="h-full w-full object-cover"
              priority={currentImageIndex === 0}
            />
          </Link>

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
        <Link
          href={`/realestate-details/${id}`}
          className="flex flex-1 flex-col p-4"
        >
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
            <MapPin size={15} /> {location.address}
          </p>

          {downPayment && (
            <span className="mb-2 flex w-fit items-center gap-1 rounded-md bg-main-transparent px-2 py-1 text-[10px] text-main">
              <Banknote size={15} /> مقدم: {formatCurrency(downPayment)}{" "}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
