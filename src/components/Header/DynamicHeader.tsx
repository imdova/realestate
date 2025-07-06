"use client";
import { usePathname } from "next/navigation";
import { matchRoute } from "./routeConfigs";
import FullHeader from "./FullHeader";
import BlogHeader from "./BlogHeader";

const DynamicHeader: React.FC = () => {
  const pathname = usePathname() || "/";
  const headerType = matchRoute(pathname)?.headerType || "full";

  const headerComponents = {
    full: FullHeader,
    blog: BlogHeader,
  };

  const SelectedHeader = headerComponents[headerType];

  return <SelectedHeader />;
};

export default DynamicHeader;
