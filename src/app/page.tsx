"use client";

import RealEstateSearch from "@/components/UI/RealEstateSearch";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4 lg:max-w-[1550px]">
          <div>
            <Suspense>
              <RealEstateSearch />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
