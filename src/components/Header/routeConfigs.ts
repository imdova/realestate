type HeaderType = "full" | "blog";

interface RouteConfig {
  pattern: string;
  headerType: HeaderType;
}

export const routeConfigs: RouteConfig[] = [
  { pattern: "/blog", headerType: "blog" },
  { pattern: "/blog*", headerType: "blog" },
  { pattern: "/*", headerType: "full" }, // fallback
];

export const matchRoute = (pathname: string): RouteConfig | undefined => {
  // 1. Exact match or dynamic segment match
  const exactMatch = routeConfigs.find(({ pattern }) => {
    if (pattern.includes("*")) return false;

    const regexPattern = pattern
      .replace(/\[(.*?)\]/g, "[^/]+") // match dynamic params
      .replace(/\//g, "\\/");

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  if (exactMatch) return exactMatch;

  // 2. Wildcard match (e.g., /blog*, /about*)
  const wildcardMatch = routeConfigs.find(({ pattern }) => {
    if (!pattern.includes("*")) return false;

    const basePattern = pattern.replace("*", ".*").replace(/\//g, "\\/");
    const regex = new RegExp(`^${basePattern}`);
    return regex.test(pathname);
  });

  return wildcardMatch;
};
