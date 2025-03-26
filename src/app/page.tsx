import LandingSlider from "@/components/UI/LandingSlider";
import LandingImg_1 from "@/assets/images/home(1)-1.png";
import LandingImg_2 from "@/assets/images/home(1)-2.png";
import { Slide } from "@/types";
import { ArrowRight, Flame } from "lucide-react";
import { Products } from "@/constants/products.data";
import CategorySlider from "@/components/UI/CategorySlider";
import ProductCard from "@/components/UI/cards/ProductCard";
import FlashSaleCounter from "@/components/UI/Counter";
import Link from "next/link";

const slides: Slide[] = [
  {
    id: 1,
    image: LandingImg_1,
    title: "Pharmacy that provides all medicines",
    subTitle: "Discounts on medicines + Delivery services",
    label: "Shop Now",
    url: "/",
  },
  {
    id: 2,
    image: LandingImg_2,
    subTitle: "Discounts on medicines + Delivery services",
    title: "Get Your Vitamins & Minerals",
    label: "Shop Now",
    url: "/",
  },
];
export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-6 lg:max-w-[1440px]">
        {/* landing content  */}
        <LandingSlider slides={slides} />
        <CategorySlider />
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          {/* Flash Sale Header with Counter */}
          <div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <h2 className="flex items-center gap-2 text-3xl font-bold md:text-4xl">
                <Flame size={30} className="text-red-500" /> Flash Sale
              </h2>
              <FlashSaleCounter duration={{ value: 2, unit: "hours" }} />
            </div>
            {/* View More Button*/}
            <div className="text-center">
              <Link
                href={"#"}
                className="hover:text-main flex items-center gap-3 font-bold transition"
              >
                View All <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
