import RealEstateSearch from "@/components/UI/real-estate/RealEstateSearch";
import { Suspense } from "react";

export const RenderSearch = () => {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <RealEstateSearch />
    </Suspense>
  );
};
