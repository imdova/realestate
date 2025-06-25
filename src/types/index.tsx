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
