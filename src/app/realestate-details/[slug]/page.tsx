import AgentCard from "@/components/UI/product/AgentCard";
import RealestateBreadcrumbs from "@/components/UI/product/RealestateBreadcrumbs";
import RealestateDetails from "@/components/UI/product/RealestateDetails";
import RealestateGallery from "@/components/UI/product/RealestateGallery";
import SimilarProperties from "@/components/UI/product/SimilarProperties";
import { realEstateData } from "@/constants/realestate";
import { notFound } from "next/navigation";
import React from "react";

interface RealestatePageProps {
  params: Promise<{ slug: string }>;
}

export default function RealestatePage({ params }: RealestatePageProps) {
  const { slug } = React.use(params);

  const realestate = realEstateData.find(
    (realestate) => realestate.id === slug,
  );

  if (!realestate) {
    return notFound();
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-2 lg:max-w-[1300px]">
        <div className="no-scrollbar overflow-x-auto">
          {/* Navigation Bar */}
          <nav className="min-w-[550px] py-2">
            <RealestateBreadcrumbs
              realestateType={realestate.type}
              realestateTitle={realestate.title}
            />{" "}
          </nav>
        </div>
        <RealestateGallery
          videos={realestate.videos}
          images={realestate.images}
          address={realestate.address}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 xl:grid-cols-10">
          {/* Left Column */}
          <div className="lg:col-span-4 xl:col-span-7">
            <RealestateDetails realestate={realestate} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 lg:col-span-3 xl:col-span-3">
            <AgentCard agent={realestate.agent} />
            <SimilarProperties />
          </div>
        </div>
      </div>
    </div>
  );
}
