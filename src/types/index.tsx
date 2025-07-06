import { LucideIcon } from "lucide-react";

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

declare global {
  interface Window {
    customIcons: {
      [key: string]: L.Icon;
      school: L.Icon;
      restaurant: L.Icon;
      hospital: L.Icon;
      market: L.Icon;
      beach: L.Icon;
      default: L.Icon;
    };
  }
}

// header types
export type linksHeader = {
  title?: string;
  image?: string;
  url: string;
  isNew?: boolean;
};
export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}
export interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  address: string;
  type: string;
  purpose: string;
  agent: {
    name: string;
    company: string;
    phone: string;
    image: string;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    yearBuilt: number;
  };
  amenities: string[];
  description: string;
  images: string[];
}

export interface Agent {
  name: string;
  company: string;
  phone: string;
  image: string;
}

// type keywords search
export interface SearchResult {
  id: string;
  title: string;
  type: "recent";
}
