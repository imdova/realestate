import React, { useEffect, useState } from "react";
import Image from "next/image";
import { products } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessagesSquare,
  RefreshCcw,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";

interface ProductModalProps {
  product: products;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
    {},
  );

  // Ensure product.images exists and has at least one image
  const validImages = product?.images?.filter((img) => img) || [];

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Images slider controls
  const changeImage = (newIndex: number) => {
    if (isTransitioning || newIndex === currentImageIndex) return;

    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    changeImage((currentImageIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    changeImage(
      (currentImageIndex - 1 + product.images.length) % product.images.length,
    );
  };

  if (!isOpen || !isBrowser) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Modal Container with scale animation */}
      <div className={`flex min-h-screen items-center justify-center p-4`}>
        {/* Overlay with fade animation */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? "opacity-50" : "opacity-0"}`}
          onClick={onClose}
        ></div>
        <div
          className={`relative mx-auto w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-700 ease-in-out ${isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button with hover animation */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 cursor-pointer p-2"
          >
            <X size={20} />
          </button>

          <div className="md:flex">
            {/* Product Images Slider */}
            <div className="relative bg-gray-50 md:w-1/2">
              {/* Main Image with proper src handling */}
              <div className="group relative aspect-square h-full w-full overflow-hidden rounded-lg">
                {validImages.map((img, index) => (
                  <div
                    key={`${index}-${img}`}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentImageIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className={`h-full w-full object-cover transition-transform duration-700 ${loadedImages[index] ? "scale-100" : "scale-95"}`}
                      priority={index === 0}
                      onLoadingComplete={() => handleImageLoad(index)}
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 scale-0 transform cursor-pointer items-center justify-center rounded-full bg-white/80 opacity-0 shadow-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 hover:scale-110 hover:bg-white"
                  disabled={isTransitioning}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 scale-0 transform cursor-pointer items-center justify-center rounded-full bg-white/80 opacity-0 shadow-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 hover:scale-110 hover:bg-white"
                  disabled={isTransitioning}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="overflow-y-auto p-6 md:max-h-[600px] md:w-1/2 md:p-8">
              {/* Badges with bounce animation */}
              <div className="mb-4 flex gap-2">
                {product.isNew && (
                  <span className="animate-bounce-once rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
                    New
                  </span>
                )}
                {product.isOnSale && (
                  <span className="animate-bounce-once rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    Sale
                  </span>
                )}
              </div>

              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {product.name}
              </h2>

              {/* Rating with star fill animation */}
              {product.rating && product.reviewCount && (
                <div className="mb-4 flex items-center">
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
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price with pulse animation on change */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                  {product.price && (
                    <p className="text-lg text-gray-500 line-through">
                      ${product.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-gray-900">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              )}

              {/* Quantity with button animations */}
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-medium text-gray-900">
                  Quantity
                </h3>
                <div className="flex w-fit items-center rounded-md border border-gray-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 transition-all hover:scale-110 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 transition-all">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 transition-all hover:scale-110 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mb-8 flex flex-col flex-wrap items-start justify-between gap-6 sm:flex-row sm:items-center">
                <button className="hover:text-main flex cursor-pointer items-center gap-1 transition">
                  <MessagesSquare size={17} />
                  <span className="text-xs font-semibold uppercase">
                    Ask a Question
                  </span>
                </button>
                <button className="hover:text-main flex cursor-pointer items-center gap-1 transition">
                  <Heart size={17} />
                  <span className="text-xs font-semibold uppercase">
                    add to wishlist
                  </span>
                </button>
                <button className="hover:text-main flex cursor-pointer items-center gap-1 transition">
                  <RefreshCcw size={17} />
                  <span className="text-xs font-semibold uppercase">
                    compare
                  </span>
                </button>
              </div>
              <div className="my-8">
                {product.categories?.length > 0 && (
                  <p className="mb-1 text-sm font-semibold text-gray-500">
                    Categories:{" "}
                    <span className="text-sm text-black">
                      {product.categories.map((category, index) => (
                        <span key={index}>
                          <Link
                            className="hover:text-main text-sm transition"
                            href="#"
                          >
                            {category}
                          </Link>
                          {index < product.categories.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                )}

                {product.tags?.length > 0 && (
                  <p className="mb-1 text-sm font-semibold text-gray-500">
                    Tags:{" "}
                    <span className="text-sm text-black">
                      {product.tags.map((tag, index) => (
                        <span key={index}>
                          <Link
                            className="hover:text-main text-sm transition"
                            href="#"
                          >
                            {tag}
                          </Link>
                          {index < product.tags.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                )}

                {product.sku && (
                  <p className="mb-1 text-sm font-semibold text-gray-500">
                    SKU:{" "}
                    <span className="text-sm text-black">{product.sku}</span>
                  </p>
                )}

                {product.brands?.length > 0 && (
                  <p className="mb-1 text-sm font-semibold text-gray-500">
                    Brands:{" "}
                    <span className="text-black">
                      {product.brands.map((brand, index) => (
                        <span key={index}>
                          <Link
                            className="hover:text-main text-sm transition"
                            href="#"
                          >
                            {brand}
                          </Link>
                          {index < product.brands.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
              </div>
              {/* Add to Cart Button with hover animation */}
              <button className="w-full rounded-md bg-black px-4 py-3 text-base font-medium text-white transition-all hover:scale-[1.02] hover:bg-gray-800 hover:shadow-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
