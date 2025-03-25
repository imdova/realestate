import LandingSlider from "@/components/UI/LandingSlider";
import LandingImg_1 from "@/assets/images/home(1)-1.png";
import LandingImg_2 from "@/assets/images/home(1)-2.png";
import { Slide } from "@/types";
import CategorySlider from "@/components/UI/CategorySlider";

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
      </div>
    </div>
  );
}
