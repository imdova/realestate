"use client";

import { useState } from "react";
import DynamicModal from "../DynamicModal";
import { Heart, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import CustomAlert from "../CustomAlert";
import Image from "next/image";
import Link from "next/link";
import { useAppSettings } from "@/hooks/useAppSettings";
import { RealEstateItem, rentalTerm } from "@/types/real-estate";

const FavoriteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { formatCurrency } = useAppSettings();
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info" | "cart" | "wishlist";
  } | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { realestates: wishlistData } = useAppSelector(
    (state) => state.wishlist,
  );
  const dispatch = useAppDispatch();

  const handleClearWishlist = () => {
    if (userId && wishlistData.length > 0) {
      dispatch(clearWishlist({ userId }));
      showAlert("تم مسح قائمة الرغبات!", "wishlist");
    }
  };

  const handleDeleteFromWishlist = (id: string) => {
    if (userId) {
      dispatch(removeFromWishlist({ id, userId }));
      showAlert("تم حذف المنتج من قائمة الرغبات!", "wishlist");
    }
  };

  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "cart" | "wishlist",
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };
  const getPriceDisplay = (item: RealEstateItem) => {
    const getRentPriceByTerm = (term?: rentalTerm): number | undefined => {
      switch (term) {
        case "يومي":
          return item.dayRent;
        case "أسبوعي":
          return item.weeklyRent;
        case "شهري":
          return item.monthlyRent;
        case "سنوي":
          return item.yearlyRent;
        default:
          return item.price;
      }
    };

    if (item.purpose === "ايجار") {
      const price = getRentPriceByTerm(item.rentalTerm);
      const termLabel =
        item.rentalTerm === "شهري"
          ? "شهرياً"
          : item.rentalTerm === "سنوي"
            ? "سنوياً"
            : item.rentalTerm === "أسبوعي"
              ? "أسبوعياً"
              : item.rentalTerm === "يومي"
                ? "يومياً"
                : "";

      return `${formatCurrency(price || 0)} ${termLabel}`;
    }

    return formatCurrency(item.price || 0);
  };
  return (
    <div>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 text-gray-800 hover:text-main"
      >
        <div className="relative">
          <Heart
            size={14}
            className="transition-colors group-hover:fill-main group-hover:text-main"
          />
          {wishlistData.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white"
            >
              {wishlistData.length}
            </motion.span>
          )}
        </div>
        <span className="hidden md:block">الإعلانات المفضلة</span>
      </motion.button>

      <DynamicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="الإعلانات المفضلة"
      >
        <div className="relative">
          {wishlistData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <Heart size={48} className="mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-500">
                قائمة الرغبات فارغة
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                لم تقم بإضافة أي إعلانات إلى المفضلة بعد
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <motion.button
                  onClick={handleClearWishlist}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600"
                >
                  <Trash2 size={14} />
                  مسح الكل
                </motion.button>
              </div>
              <div className="overflow-auto">
                <div className="max-h-[400px] min-w-[350px] space-y-4 px-4">
                  <AnimatePresence>
                    {wishlistData.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-4 rounded-lg border p-3"
                      >
                        <Link
                          href={`/realestate-details/${item.id}`}
                          className="flex-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={
                                  item.images?.[0] || "/images/placeholder.jpg"
                                }
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-right">
                              <h3 className="line-clamp-1 text-sm font-medium">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {item.location.address}
                              </p>
                              <p className="mt-1 text-sm font-bold text-main">
                                {getPriceDisplay(item)}
                              </p>
                              {item.downPayment && (
                                <p className="text-xs text-gray-500">
                                  مقدم: {formatCurrency(item.downPayment)}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>

                        <motion.button
                          onClick={() => handleDeleteFromWishlist(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-full p-1 text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </div>
      </DynamicModal>
    </div>
  );
};

export default FavoriteModal;
