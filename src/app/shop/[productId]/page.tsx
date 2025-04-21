"use client";
import { Products } from "@/constants/products.data";
import {
  Check,
  Fullscreen,
  Heart,
  MessagesSquare,
  Minus,
  Plus,
  RefreshCcw,
  RotateCcw,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useRef, useState } from "react";
import CheckoutImage from "@/assets/images/checkout.jpg";
import Link from "next/link";
import ImageViewer from "@/components/UI/ImageViewer";

// type ProductPageProps = {
//   product: products;
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params!;
//   // Replace with your API endpoint or database query
//   const res = await fetch(`https://api.example.com/products/${id}`);
//   const product: products = await res.json();

//   return { props: { product } };
// };
interface SingleProductsProps {
  params: Promise<{ productId: string }>;
}

export default function ProductPage({ params }: SingleProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "information">(
    "description",
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  // Mouse move handler to update scale and position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scaleFactor = 1.1;
      setScale(scaleFactor);

      setPosition({
        x: ((mouseX - rect.width / 2) / rect.width) * 5, // Moves the image horizontally
        y: ((mouseY - rect.height / 2) / rect.height) * 5, // Moves the image vertically
      });
    }
  };

  // Reset scale and position when mouse leaves or the image loses focus
  const handleMouseLeave = () => {
    setScale(1); // Reset scale
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  const handleFocus = () => {
    setScale(1); // Reset scale on focus
    setPosition({ x: 0, y: 0 }); // Reset position
  };

  const { productId } = use(params);

  const Product = Products.find((product) => product.id === productId);

  if (!Product) return notFound;
  return (
    <section className="relative py-10">
      <div className="container mx-auto px-6 lg:max-w-[1440px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="w-full">
            {/* Main Image */}
            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave} // Reset on mouse leave
              onFocus={handleFocus} // Reset on focus
              tabIndex={0} // Make div focusable to trigger onFocus
              className="relative mx-auto w-full overflow-hidden rounded-lg"
            >
              <Image
                src={Product.images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                width={600}
                height={600}
                className="h-full w-full object-cover shadow-lg transition-transform duration-100 ease-in-out"
                style={{
                  transform: `scale(${scale}) translateX(${position.x}%) translateY(${position.y}%)`,
                }}
              />
              <button
                onClick={() => {
                  setIsViewerOpen(true);
                }}
                className="absolute top-4 right-4 cursor-pointer text-gray-500"
              >
                <Fullscreen size={25} />
              </button>
              {isViewerOpen && (
                <ImageViewer
                  images={Product.images}
                  initialIndex={currentIndex}
                  onClose={() => setIsViewerOpen(false)}
                />
              )}
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 flex justify-center space-x-2">
              {Product.images.map((src: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer rounded-lg border transition-transform duration-300 ${
                    currentIndex === index
                      ? "border-main scale-105"
                      : "scale-90 border-gray-300"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${index}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col max-lg:mx-auto max-lg:max-w-[608px] lg:order-none">
            <h2 className="font-manrope mb-2 text-center text-4xl leading-10 font-bold text-gray-900 lg:text-start">
              {Product.name}
            </h2>
            <div className="flex flex-col items-center gap-3 py-5 sm:flex-row">
              <div className="flex gap-3">
                <div className="flex gap-1 border-r border-r-gray-200 pr-3">
                  <span className="text-sm text-gray-600">Brand:</span>
                  <span className="text-sm">{Product.brands.join(",")}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Rating */}
                  {Product.rating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < (Product?.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <span className="ml-3 flex items-center gap-1 text-green-500">
                <Check size={17} />
                In Stock
              </span>
            </div>
            <div className="mb-6 flex items-end justify-center gap-3 lg:justify-start">
              <h6 className="text-main text-4xl leading-9 font-bold">
                ${Product.price}
              </h6>
              <del className="text-2xl leading-9 text-gray-400">
                ${Product.priceDel}
              </del>
            </div>
            <p className="mb-8 text-base font-normal text-gray-500">
              {Product.description}
            </p>
            <div className="block w-full">
              <div className="text">
                <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row">
                  <div className="flex w-full items-center justify-center rounded-md bg-gray-100 p-2 md:w-fit">
                    <button className="cursor-pointer">
                      <Minus size={16} />
                    </button>
                    <input
                      type="text"
                      className="w-full bg-transparent text-center text-lg text-gray-900 outline-none placeholder:text-gray-900 lg:max-w-[70px]"
                      placeholder="1"
                    />
                    <button className="cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="text-main flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#42a4f529] p-3 text-sm font-semibold transition-all duration-500 hover:bg-[#42a4f53f] md:w-fit">
                    <ShoppingCart size={18} />
                    Add to cart
                  </button>
                </div>
                <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <button className="hover:text-main flex cursor-pointer items-center gap-1 transition">
                    <MessagesSquare size={17} />
                    <span className="text-xs font-semibold uppercase">
                      Ask a Question
                    </span>
                  </button>
                  <div className="flex gap-3">
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
                </div>
                <div className="relative mb-8 flex items-center justify-center rounded-2xl border border-gray-300 p-6">
                  <Image
                    className="w-[350px] object-cover"
                    src={CheckoutImage}
                    alt="checkout"
                    width={200}
                    height={200}
                  />
                  <div className="absolute -top-2 left-1/2 flex w-full -translate-x-1/2 justify-center">
                    <span className="bg-white px-6 text-center text-sm font-semibold">
                      Guarantee Safe & Secure Checkout
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row">
                  <div className="flex items-center gap-2 font-semibold uppercase">
                    <Truck size={20} />
                    <span>
                      Free delivery {""}
                      <span className="text-gray-500">over $100</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold uppercase">
                    <RotateCcw size={20} />
                    <span>
                      30 Days Return {""}
                      <span className="text-gray-500">Period</span>
                    </span>
                  </div>
                </div>
                <div className="my-8">
                  {Product.categories?.length > 0 && (
                    <p className="mb-1 font-semibold text-gray-500">
                      Categories:{" "}
                      <span className="text-black">
                        {Product.categories.map((category, index) => (
                          <span key={index}>
                            <Link
                              className="hover:text-main transition"
                              href="#"
                            >
                              {category}
                            </Link>
                            {index < Product.categories.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </p>
                  )}

                  {Product.tags?.length > 0 && (
                    <p className="mb-1 font-semibold text-gray-500">
                      Tags:{" "}
                      <span className="text-black">
                        {Product.tags.map((tag, index) => (
                          <span key={index}>
                            <Link
                              className="hover:text-main transition"
                              href="#"
                            >
                              {tag}
                            </Link>
                            {index < Product.tags.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </p>
                  )}

                  {Product.sku && (
                    <p className="mb-1 font-semibold text-gray-500">
                      SKU: <span className="text-black">{Product.sku}</span>
                    </p>
                  )}

                  {Product.brands?.length > 0 && (
                    <p className="mb-1 font-semibold text-gray-500">
                      Brands:{" "}
                      <span className="text-black">
                        {Product.brands.map((brand, index) => (
                          <span key={index}>
                            <Link
                              className="hover:text-main transition"
                              href="#"
                            >
                              {brand}
                            </Link>
                            {index < Product.brands.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          {/* Tabs */}
          <div className="mb-7 flex justify-center gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`cursor-pointer px-4 py-2 transition-all sm:text-xl ${
                activeTab === "description"
                  ? "text-primary border-primary border-b-2 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("information")}
              className={`cursor-pointer px-4 py-2 transition-all sm:text-xl ${
                activeTab === "information"
                  ? "text-primary border-primary border-b-2 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Additional information
            </button>
          </div>

          {/* Content */}
          <div className="min-h-52">
            {activeTab === "description" && Product.description && (
              <p className="prose max-w-none text-gray-600 sm:text-lg">
                {Product.description}
              </p>
            )}

            {activeTab === "information" && (
              // <div className="prose max-w-none">{Product.information}</div>
              <div>
                <h2 className="mb-6 text-2xl font-bold">
                  Additional information
                </h2>
                <ul className="flex flex-col gap-6">
                  {Product.additional_information.map((information, index) => {
                    return (
                      <li
                        className="flex flex-col items-center justify-between md:flex-row"
                        key={index}
                      >
                        <h4 className="w-full text-lg font-semibold">
                          {information.label}
                        </h4>
                        <p className="w-full text-gray-600">
                          {information.content}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
