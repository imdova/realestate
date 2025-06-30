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
}

export interface RealEstateItem {
  id: number;
  title: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  images: string[];
  status: RealEstateStatus;
  type: RealEstateType;
  downPayment?: number;
  employer: EmployerCompany;
  description: string;
  bathrooms: number;
  yearBuilt: number | null;
  amenities: string[];
}
