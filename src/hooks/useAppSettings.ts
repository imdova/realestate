// hooks/useAppSettings.ts
import { useEffect, useState, useMemo } from "react";

type Settings = {
  currency: string; // Currency symbol (ر.س)
  currencyCode: string; // ISO currency code (SAR)
  areaUnit: string;
};

type Formatters = {
  formatCurrency: (price: number) => string;
  formatArea: (area: number) => string;
};

export function useAppSettings(): Settings & Formatters {
  const [settings, setSettings] = useState<Settings>({
    currency: "ر.س",
    currencyCode: "SAR",
    areaUnit: "متر مربع",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("appSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Ensure we have required fields
          setSettings({
            currency: parsed.currency,
            currencyCode: parsed.currencyCode,
            areaUnit: parsed.areaUnit,
          });
        } catch {
          // Invalid JSON fallback to defaults
        }
      }
    }
  }, []);

  const formatters = useMemo<Formatters>(() => {
    return {
      formatCurrency: (price: number) => {
        try {
          return new Intl.NumberFormat("ar-EG", {
            style: "currency",
            currency: settings.currencyCode, // Fallback to SAR
            currencyDisplay: "symbol",
            maximumFractionDigits: 0,
          }).format(price);
        } catch (e) {
          console.log(e);
          // Fallback formatting if Intl fails
          return ` ${price.toLocaleString("ar-EG")} ${settings.currency} `;
        }
      },
      formatArea: (area: number) => {
        return `${area.toLocaleString("ar-EG", {
          maximumFractionDigits: 2,
        })} ${settings.areaUnit}`;
      },
    };
  }, [settings.currencyCode, settings.currency, settings.areaUnit]);

  return {
    ...settings,
    ...formatters,
  };
}
