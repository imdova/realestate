"use client";

import BlogCard from "@/components/UI/BlogCard";
import BlogsSlider from "@/components/UI/BlogsSlider";
import PropertyTabs from "@/components/UI/PropertyTabs";
import RealEstateSearch from "@/components/UI/RealEstateSearch";
import RealEstateSlider from "@/components/UI/RealEstateSlider";
import { blogPosts } from "@/constants/blogs";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 lg:max-w-[1440px]">
        <section>
          <div>
            <Suspense>
              <RealEstateSearch />
            </Suspense>
          </div>
        </section>
        <section className="py-10">
          <div className="flex min-h-[100px] flex-col items-center justify-between gap-4 rounded-lg bg-[url(/images/shap.png)] bg-cover bg-top p-3 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start lg:flex-row lg:items-center">
              <div className="flex flex-row-reverse -space-x-4">
                <Image
                  className="h-16 w-16 rounded-full shadow-md"
                  src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg?t=st=1751123896~exp=1751127496~hmac=e0467835668dea8f0f1c41c3dfc1fcff22f8d20a5eab1a0111bd508a30b00950&w=1380"
                  width={200}
                  height={200}
                  alt="Avatars"
                />
                <Image
                  className="h-16 w-16 rounded-full shadow-md"
                  src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg?t=st=1751123896~exp=1751127496~hmac=e0467835668dea8f0f1c41c3dfc1fcff22f8d20a5eab1a0111bd508a30b00950&w=1380"
                  width={200}
                  height={200}
                  alt="Avatars"
                />
                <Image
                  className="h-16 w-16 rounded-full shadow-md"
                  src="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg?t=st=1751123896~exp=1751127496~hmac=e0467835668dea8f0f1c41c3dfc1fcff22f8d20a5eab1a0111bd508a30b00950&w=1380"
                  width={200}
                  height={200}
                  alt="Avatars"
                />
              </div>
              <div className="text-center text-white md:text-right">
                <div className="mb-1 flex justify-center gap-2 md:justify-start">
                  <h2>ابحث عن ™TruBroker</h2>
                  <span className="flex h-5 w-9 items-center justify-center rounded-full bg-[#f73131] text-xs">
                    جديد
                  </span>
                </div>
                <p className="text-inherit">
                  ابحث عن الوكلاء الموثوقين الذين حصلوا على جوائز لأدائهم
                  الممتاز
                </p>
              </div>
            </div>
            <Link
              className="flex items-center justify-between gap-2 rounded-lg bg-white px-4 py-2"
              href={"#"}
            >
              أبحث عن الوكيل <ChevronLeft size={17} />
            </Link>
          </div>
          <div className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href={"#"}
              className="flex h-[180px] justify-end overflow-hidden rounded-lg bg-[url(/images/home-2.png)] bg-cover bg-center p-4 lg:h-[260px]"
            >
              <div className="w-full">
                <h2 className="mb-2 text-lg font-bold sm:text-2xl">
                  أختار وسيطك العقاري
                </h2>
                <p className="text-md max-w-[200px]">
                  اختار من بين أفضل العقارات من أكبر الوسطاء العقاريين
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex h-[180px] justify-end overflow-hidden rounded-lg bg-[url(/images/home-1.png)] bg-cover bg-center p-4 lg:h-[260px]"
            >
              <div className="w-full">
                <h2 className="mb-2 text-lg font-bold sm:text-2xl">
                  سيرتش 2.0
                </h2>
                <p className="text-md max-w-[200px]">
                  أوجد عقارات وفقاً لمدة القيادة
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex h-[180px] justify-end overflow-hidden rounded-lg bg-[url(/images/home-3.png)] bg-cover bg-center p-4 lg:h-[260px]"
            >
              <div className="w-full">
                <h2 className="mb-2 text-lg font-bold sm:text-2xl">
                  العرض على الخريطة
                </h2>
                <p className="text-md max-w-[200px]">
                  ابحث عن العقارات في المنطقة التي تناسبك
                </p>
              </div>
            </Link>
          </div>
          <div className="relative flex h-[160px] overflow-hidden rounded-lg sm:h-[220px]">
            <div className="absolute h-full w-full bg-gradient-to-l from-main from-55% to-main-transparent"></div>
            <div className="w-full bg-main"></div>
            <Image
              className="h-full w-full object-cover"
              src={"/images/realestate.jpg"}
              width={500}
              height={500}
              alt="banner"
            />
            <div className="absolute flex h-full flex-col justify-center p-6 text-white">
              <h2 className="mb-2 text-sm font-bold sm:text-2xl">
                اختار بيتك و احسب اقساطك
              </h2>
              <p className="mb-4 text-xs sm:text-lg">
                اختار بيتك و احسب اقساطك من خلال الآلة الحاسبة للتمويل العقاري
              </p>
              <Link
                className="flex w-fit items-center justify-between gap-2 rounded-lg bg-white px-4 py-2 text-xs text-gray-800 sm:text-base"
                href={"#"}
              >
                اعرض الآن <ChevronLeft size={17} />
              </Link>
            </div>
          </div>
          <div className="relative py-10">
            <h1 className="mb-8 text-center text-2xl font-bold">
              اعرف المزيد عن سوق العقارات في مَصر
            </h1>
            <BlogsSlider>
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </BlogsSlider>
          </div>
          <div className="py-8">
            <PropertyTabs />
          </div>
          <div className="py-8">
            <RealEstateSlider />
          </div>
        </section>
      </div>
    </>
  );
}
