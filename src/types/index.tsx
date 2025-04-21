import { StaticImageData } from "next/image";

export interface BaseHeaderProps {
  pathname: string;
}

// Define the User type
export type UserProps = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

// header types

export type link = {
  title: string;
  url: string;
};
export type gridLink = {
  heading: string;
  subLinks: link[];
};
export type linksHeader = {
  title: string;
  url: string;
  subLinks?: link[];
  gridLinks?: gridLink[];
  banner?: {
    active: boolean;
    title: string;
    details: string;
    image: string | StaticImageData;
  };
};

// Glopal types

// Landing page Slider
export type Slide = {
  id: number;
  image: string | StaticImageData;
  title: string;
  subTitle: string;
  url: string;
  label: string;
};
type information = {
  label: string;
  content: string;
};
// Products and card Product type
export interface products {
  id: string;
  name: string;
  categories: string[];
  tags: string[];
  sku: string;
  brands: string[];
  description: string;
  price: string;
  priceDel?: string;
  images: string[];
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isOnSale?: boolean;
  additional_information: information[];
}
