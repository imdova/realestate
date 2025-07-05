"use client";

import { Heart } from "lucide-react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface WishlistButtonProps {
  isInWishlist: boolean;
  productId: string;
  addToWishlist: (e: React.MouseEvent) => void;
}

const WishlistButton = ({
  isInWishlist,
  addToWishlist,
}: WishlistButtonProps) => {
  const { requireAuth, AuthModal } = useRequireAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    requireAuth(() => {
      addToWishlist(e);
    });
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.9 }}
        className={`absolute right-2 top-2 z-[2] rounded-full p-2 ${
          isInWishlist ? "bg-red-100 text-red-500" : "bg-white/90 text-gray-700"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isInWishlist ? "filled" : "empty"}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{
              scale: 1,
              opacity: 1,
              color: isInWishlist
                ? "#ef4444"
                : isHovered
                  ? "#ef4444"
                  : "#374151",
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </motion.div>
        </AnimatePresence>

        {/* Floating hearts effect when added to wishlist */}
        <AnimatePresence>
          {isInWishlist && isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [1, 0.8, 0],
                    y: -20 - i * 10,
                    x: Math.random() * 16 - 8,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <Heart size={16} className="text-red-500" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>
      {AuthModal}
    </>
  );
};

export default WishlistButton;
