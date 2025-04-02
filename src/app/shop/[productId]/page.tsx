"use client";
import { Products } from "@/constants/products.data";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useRef, useState } from "react";

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
  const images = [
    "https://pagedone.io/asset/uploads/1700471851.png",
    "https://pagedone.io/asset/uploads/1711514857.png",
    "https://pagedone.io/asset/uploads/1711514875.png",
    "https://pagedone.io/asset/uploads/1711514892.png",
  ];
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement | null>(null);

  // Mouse move handler to update scale and position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scaleFactor = 1.07;
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
    <section className="relative py-10 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-3xl">
            {/* Main Image */}
            <div
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave} // Reset on mouse leave
              onFocus={handleFocus} // Reset on focus
              tabIndex={0} // Make div focusable to trigger onFocus
              className="relative mx-auto w-full max-w-lg overflow-hidden rounded-lg"
            >
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                width={500}
                height={500}
                className="h-full w-full object-cover shadow-lg transition-transform duration-100 ease-in-out"
                style={{
                  transform: `scale(${scale}) translateX(${position.x}%) translateY(${position.y}%)`,
                }}
              />
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 flex justify-center space-x-2">
              {images.map((src: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer rounded-lg border-2 ${
                    currentIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
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
          <div className="pro-detail order-last flex w-full flex-col justify-center max-lg:mx-auto max-lg:max-w-[608px] lg:order-none">
            <p className="mb-4 text-lg font-medium text-indigo-600">
              Travel &nbsp; / &nbsp; Menswear
            </p>
            <h2 className="font-manrope mb-2 text-3xl leading-10 font-bold text-gray-900">
              {Product.name}
            </h2>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center">
              <h6 className="font-manrope mr-5 border-gray-200 pr-5 text-2xl leading-9 font-semibold text-gray-900 sm:border-r">
                ${Product.price}
              </h6>
              <div className="flex items-center gap-2">
                {/* Rating */}
                {Product.rating && (
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (Product?.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                )}
                <span className="pl-2 text-sm leading-7 font-normal text-gray-500">
                  {Product.reviewCount || 0} review
                </span>
              </div>
            </div>
            <p className="mb-8 text-base font-normal text-gray-500">
              {Product.description}
            </p>
            <div className="block w-full">
              <div className="text">
                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex w-full items-center justify-center">
                    <button className="group rounded-l-full border border-gray-400 px-6 py-4 shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:shadow-gray-300">
                      <svg
                        className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="w-full border-y border-gray-400 bg-transparent px-6 py-[13px] text-center text-lg font-semibold text-gray-900 outline-0 placeholder:text-gray-900 focus-within:bg-gray-50 hover:bg-gray-50 lg:max-w-[118px]"
                      placeholder="1"
                    />
                    <button className="group rounded-r-full border border-gray-400 px-6 py-4 shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:shadow-gray-300">
                      <svg
                        className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 5.5V16.5M16.5 11H5.5"
                          stroke=""
                          strokeOpacity="0.2"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-indigo-50 px-5 py-4 text-lg font-semibold text-indigo-600 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200">
                    <svg
                      className="stroke-indigo-600 transition-all duration-500"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="group rounded-full bg-indigo-50 p-4 transition-all duration-500 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                        stroke="#4F46E5"
                        strokeWidth="1.6"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="flex w-full items-center justify-center rounded-[100px] bg-indigo-600 px-5 py-4 text-center text-lg font-semibold text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
