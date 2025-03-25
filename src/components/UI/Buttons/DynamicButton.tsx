import React from "react";
import Link from "next/link";

interface DynamicButtonProps {
  href: string;
  label: string;
  width?: string;
  variant?: "primary" | "secondary" | "outline" | "white";
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  href,
  label,
  width = "auto",
  variant = "primary",
}) => {
  const baseStyles =
    "inline-block px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-center";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    white: "bg-white text-black shadow-sm hover:bg-gray-100",
  };

  return (
    <Link href={href}>
      <div className={`${baseStyles} ${variants[variant]}`} style={{ width }}>
        {label}
      </div>
    </Link>
  );
};

export default DynamicButton;
