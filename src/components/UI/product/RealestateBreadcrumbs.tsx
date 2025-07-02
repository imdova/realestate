"use client";

import { getCategoryBreadcrumbs } from "@/util/categoryUtils";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

interface RealestateBreadcrumbsProps {
  realestateType?: string;
  realestateTitle?: string;
}

export default function RealestateBreadcrumbs({
  realestateType,
  realestateTitle,
}: RealestateBreadcrumbsProps) {
  // Determine category based on realestate type
  const categorySlug =
    realestateType === "فيلا"
      ? "villas"
      : realestateType === "شقة"
        ? "apartments"
        : realestateType === "أرض"
          ? "lands"
          : realestateType === "محل"
            ? "commercial"
            : "all";

  const breadcrumbs = getCategoryBreadcrumbs(categorySlug, realestateTitle);

  return (
    <nav className="flex items-center bg-white px-4 pb-2 shadow-sm md:px-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors hover:text-main"
          aria-label="الرئيسية"
        >
          <Home className="h-4 w-4" />
          <span>الرئيسية</span>
        </Link>

        {/* Breadcrumbs */}
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            <ChevronLeft
              className="mx-1 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition-colors hover:text-main"
                aria-label={crumb.name}
              >
                {crumb.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
