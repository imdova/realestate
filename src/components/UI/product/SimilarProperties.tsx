import PropertyCard from "./PropertyCard";
import { realEstateData } from "@/constants/realestate";

export default function SimilarProperties() {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">عقارات مشابهة</h2>

      <div className="space-y-4">
        {realEstateData.slice(0, 4).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
