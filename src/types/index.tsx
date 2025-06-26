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
