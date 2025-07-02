"use client";
import { useAppSettings } from "@/hooks/useAppSettings";
import { RealEstateItem } from "@/types/real-estate";
import { Bed, Bath, Ruler, Heart } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
  property: RealEstateItem;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { formatArea } = useAppSettings();

  return (
    <div className="group flex cursor-pointer items-start space-x-4 space-x-reverse">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={property.images[0]}
          width={600}
          height={600}
          alt={property.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 transition-colors group-hover:text-main">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500">{property.address}</p>
        <p className="mt-1 font-medium text-main">{property.price}</p>
        <div className="mt-2 flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span>{formatArea(property.area)} </span>
          </div>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-red-500">
        <Heart className="h-5 w-5" />
      </button>
    </div>
  );
}
