"use client";
import { products } from "@/types";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const ProductCard: React.FC<{
  product: products;
  setProductView: (product: products) => void;
  setIsModalOpen: (x: boolean) => void;
}> = ({ product, setProductView, setIsModalOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showWishlistTooltip, setShowWishlistTooltip] = useState(false);
  const [showCartTooltip, setShowCartTooltip] = useState(false);
  const [showViewTooltip, setShowViewTooltip] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    setShowWishlistTooltip(false);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInCart(!isInCart);
    setShowCartTooltip(false);
  };

  const handleQuickViewClick = () => {
    setProductView(product);
    setIsModalOpen(true);
    setShowViewTooltip(false);
  };

  return (
    <div
      className="group relative w-full overflow-hidden rounded-lg bg-white transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Product Image */}
        <Link
          href={`/shop/${product.id}`}
          className="block h-[250px] w-full overflow-hidden rounded-t-2xl"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            width={300}
            height={300}
            priority
          />

          {/* Badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
              New
            </span>
          )}

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              -{product.discount}%
            </span>
          )}
        </Link>

        {/* Action Buttons (shown on hover) */}
        <div
          className={`absolute right-0 bottom-3 left-0 mx-auto flex w-fit justify-center gap-2 rounded-xl bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100 sm:translate-y-full sm:opacity-0"}`}
        >
          <div className="relative">
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-800 transition"
              onClick={handleWishlistClick}
              onMouseEnter={() => setShowWishlistTooltip(true)}
              onMouseLeave={() => setShowWishlistTooltip(false)}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                size={16}
                className={`${isWishlisted ? "fill-red-500 stroke-red-500" : "text-gray-700"}`}
              />
            </button>
            {/* Tooltip */}
            <div
              className={`absolute -top-9 left-1/2 z-10 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white transition-all duration-200 ${showWishlistTooltip ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
            >
              {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              <div
                className={`absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black transition-opacity duration-200 ${showWishlistTooltip ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          </div>

          <div className="relative">
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-800 transition"
              onClick={handleCartClick}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}
              onMouseEnter={() => setShowCartTooltip(true)}
              onMouseLeave={() => setShowCartTooltip(false)}
            >
              <ShoppingCart
                size={16}
                className={`${isInCart ? "stroke-main" : "text-gray-700"}`}
              />
            </button>
            {/* Tooltip */}
            <div
              className={`absolute -top-9 left-1/2 z-10 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white transition-all duration-200 ${showCartTooltip ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
            >
              {isInCart ? "Remove from cart" : "Add to cart"}
              <div
                className={`absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black transition-opacity duration-200 ${showCartTooltip ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={handleQuickViewClick}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-gray-800 transition"
              aria-label="Quick view"
              onMouseEnter={() => setShowViewTooltip(true)}
              onMouseLeave={() => setShowViewTooltip(false)}
            >
              <Eye size={16} className="text-gray-700" />
            </button>
            {/* Tooltip */}
            <div
              className={`absolute -top-9 left-1/2 z-10 -translate-x-1/2 transform rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white transition-all duration-200 ${showViewTooltip ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
            >
              Quick view
              <div
                className={`absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-black transition-opacity duration-200 ${showViewTooltip ? "opacity-100" : "opacity-0"}`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link
          href={`/shop/${product.id}`}
          className="hover:text-main text-xs font-medium text-gray-500 uppercase"
        >
          {product.categories?.[0] || "Uncategorized"}
        </Link>
        <Link
          href={`/shop/${product.id}`}
          className="hover:text-main mt-1 line-clamp-1 text-lg font-semibold text-gray-800"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {product.details}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-main text-lg font-bold">
              ${product.price.toFixed(2)}
            </p>
            {product.priceDel && (
              <del className="text-sm font-medium text-gray-400">
                ${product.priceDel.toFixed(2)}
              </del>
            )}
          </div>
        </div>
        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => {
              const rating = Math.floor(product.rating || 0);
              const isFilled = i < rating;

              return (
                <Star
                  key={i}
                  className={`h-4 w-4 ${isFilled ? "text-yellow-400" : "text-gray-300"}`}
                  fill={isFilled ? "currentColor" : "none"}
                />
              );
            })}

            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount || 0} reviews)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
