// hooks/useAppSettings.ts
import { useEffect, useState } from "react";

type Settings = {
  currency: string;
  areaUnit: string;
};

export function useAppSettings(): Settings {
  const [settings, setSettings] = useState<Settings>({
    currency: "ر.س",
    areaUnit: "متر مربع",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appSettings");
      if (saved) {
        try {
          setSettings(JSON.parse(saved));
        } catch {
          // Invalid JSON fallback
        }
      }
    }
  }, []);

  return settings;
}
