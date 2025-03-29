"use client";
import { products } from "@/types";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const ProductCard: React.FC<{ product: products }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  return (
    <div
      className="group relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link
        href={"#"}
        className="relative block h-[250px] w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          width={300}
          height={300}
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

        {/* Action Buttons (shown on hover) */}
        <div
          className={`absolute right-0 bottom-0 left-0 flex justify-center space-x-2 p-3 transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-800 transition hover:bg-gray-200"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              size={15}
              className={`${isWishlisted ? "fill-red-500 stroke-red-500" : "text-gray-700"}`}
            />
          </button>

          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-800 transition hover:bg-gray-200"
            onClick={() => setIsInCart(!isInCart)}
          >
            <ShoppingCart
              size={15}
              className={`${isInCart ? "stroke-main" : "text-gray-700"}`}
            />
          </button>

          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-50 text-gray-800 transition hover:bg-gray-200">
            <Eye size={15} className="text-gray-700" />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link
          href={"#"}
          className="hover:text-main text-xs font-medium text-gray-500 uppercase"
        >
          {product.category}
        </Link>

        <Link
          href={"#"}
          className="hover:text-main mt-1 line-clamp-1 text-lg font-semibold text-gray-800"
        >
          {product.name}
        </Link>

        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-main text-lg font-bold">${product.price}</p>
            {product.priceDel && (
              <del className="text-sm font-medium text-gray-400">
                ${product.priceDel}
              </del>
            )}
          </div>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < (product?.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
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
