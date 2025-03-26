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
export type linksHeader = {
  title: string;
  url: string;
  subLinks?: link[];
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

// Products and card Product type
export interface products {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: string;
  priceDel?: string;
  image: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviewCount?: number;
}
