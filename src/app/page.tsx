"use client";

import RealEstateSearch from "@/components/UI/RealEstateSearch";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 lg:max-w-[1550px]">
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
              className="relative flex h-[250px] justify-end overflow-hidden rounded-lg p-4 md:h-[330px]"
            >
              <Image
                className="absolute left-0 top-0 h-full w-full scale-x-[-1] object-cover"
                src="/images/works.svg"
                width={300}
                height={300}
                alt="works"
              />
              <div className="relative w-full">
                <h2 className="mb-2 text-2xl font-bold">سيرتش 2.0</h2>
                <p className="text-md max-w-[200px]">
                  أوجد عقارات وفقاً لمدة القيادة
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="relative flex h-[250px] justify-end overflow-hidden rounded-lg p-4 md:h-[330px]"
            >
              <Image
                className="absolute left-0 top-0 h-full w-full scale-x-[-1] object-cover"
                src="/images/cars.svg"
                width={300}
                height={300}
                alt="cars"
              />
              <div className="relative w-full">
                <h2 className="mb-2 text-2xl font-bold">العرض على الخريطة</h2>
                <p className="text-md max-w-[200px]">
                  ابحث عن العقارات في المنطقة التي تناسبك
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="relative flex h-[250px] justify-end overflow-hidden rounded-lg p-4 md:h-[330px]"
            >
              <Image
                className="absolute left-0 top-0 h-full w-full scale-x-[-1] object-cover"
                src="/images/maps.svg"
                width={300}
                height={300}
                alt="maps"
              />
              <div className="relative w-full">
                <h2 className="mb-2 text-2xl font-bold">أختار وسيطك العقاري</h2>
                <p className="text-md max-w-[200px]">
                  اختار من بين أفضل العقارات من أكبر الوسطاء العقاريين
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
