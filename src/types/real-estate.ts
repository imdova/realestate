export type RealEstateStatus = "مميز" | "استثنائي" | "افضل عقار لهذا الاسبوع";
export type RealEstateType =
  | "شقة"
  | "فيلا"
  | "شاليه"
  | "غرفة"
  | "عمارة"
  | "أرض"
  | "دوبلكس"
  | "محل"
  | "مكتب";

export type rentalTerm = "شهري" | "سنوي" | "أسبوعي" | "يومي";
export type constructionType = "جاهز" | "قيد الانشاء";
export type furnishingType = "مفروشة" | "غير مفروشة";
export type purposeType = "ايجار" | "بيع";

type NearbyPlace = {
  id: string;
  name: string;
  type: "school" | "restaurant" | "hospital" | "market" | "beach";
  distance: string;
  location: [number, number];
};

export interface SearchParams {
  page?: string;
  type?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  bedrooms?: string;
  query?: string;
}

export interface RealEstate {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface RealEstateResponse {
  data: RealEstate[];
  total: number;
  totalPages: number;
}

export interface EmployerCompany {
  id: number;
  name: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  website?: string;
  company?: string;
  rating?: number;
  reviews?: number;
}

export interface RealEstateItem {
  id: string;
  title: string;
  price?: number;
  area: number;
  bedrooms: number;
  images: string[];
  status: RealEstateStatus;
  type: RealEstateType;
  downPayment?: number;
  description: string;
  bathrooms: number;
  yearBuilt: number | null;
  amenities: string[];
  rentalTerm?: rentalTerm;
  dayRent?: number;
  weeklyRent?: number;
  monthlyRent?: number;
  yearlyRent?: number;
  address: string;
  purpose: purposeType;
  agent: EmployerCompany;
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    yearBuilt: number;
  };
  videos: string[];
  construction?: constructionType;
  furnishing?: furnishingType;
  createdAt: string;
  reference_num?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  nearbyPlaces: NearbyPlace[];
}
