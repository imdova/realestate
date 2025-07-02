interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
}

interface Breadcrumb {
  name: string;
  href: string;
}

export const realEstateCategories: Category[] = [
  { id: "1", name: "جميع العقارات", slug: "all" },
  { id: "2", name: "للبيع", slug: "for-sale", parent: "1" },
  { id: "3", name: "للإيجار", slug: "for-rent", parent: "1" },
  { id: "4", name: "شقق", slug: "apartments", parent: "2" },
  { id: "5", name: "فلل", slug: "villas", parent: "2" },
  { id: "6", name: "أراضي", slug: "lands", parent: "2" },
  { id: "7", name: "شقق", slug: "apartments", parent: "3" },
  { id: "8", name: "فلل", slug: "villas", parent: "3" },
  { id: "9", name: "محلات تجارية", slug: "commercial", parent: "1" },
  { id: "10", name: "مكاتب", slug: "offices", parent: "1" },
];

export const getCategoryBreadcrumbs = (
  currentCategorySlug: string,
  propertyTitle?: string,
): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [];

  // Find current category
  const currentCategory = realEstateCategories.find(
    (cat) => cat.slug === currentCategorySlug,
  );

  if (!currentCategory) return breadcrumbs;

  // Build breadcrumbs hierarchy
  const buildBreadcrumbs = (categoryId: string) => {
    const category = realEstateCategories.find((cat) => cat.id === categoryId);
    if (category) {
      if (category.parent) {
        buildBreadcrumbs(category.parent);
      }
      breadcrumbs.push({
        name: category.name,
        href: `/category/${category.slug}`,
      });
    }
  };

  buildBreadcrumbs(currentCategory.id);

  // Add property title if provided (as last item)
  if (propertyTitle) {
    breadcrumbs.push({
      name:
        propertyTitle.length > 25
          ? `${propertyTitle.substring(0, 25)}...`
          : propertyTitle,
      href: "#",
    });
  }

  return breadcrumbs;
};

export const getParentCategories = () => {
  return realEstateCategories.filter((cat) => !cat.parent);
};

export const getChildCategories = (parentSlug: string) => {
  const parent = realEstateCategories.find((cat) => cat.slug === parentSlug);
  if (!parent) return [];
  return realEstateCategories.filter((cat) => cat.parent === parent.id);
};

// Helper to get all possible category slugs
export const getAllCategorySlugs = () => {
  return realEstateCategories.map((cat) => cat.slug);
};
