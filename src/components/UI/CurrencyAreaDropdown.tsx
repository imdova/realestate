"use client";
import { Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

type Settings = {
  currency: string;
  currencyCode: string;
  currencyLabel: string;
  areaUnit: string;
  areaUnitValue: string;
};

const CurrencyAreaDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    currency: "ج.م",
    currencyCode: "EGP",
    currencyLabel: "جنيه مصري",
    areaUnit: "متر مربع",
    areaUnitValue: "م²",
  });
  const [showModal, setShowModal] = useState(false);
  const [tempSettings, setTempSettings] = useState<Settings>({ ...settings });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencyOptions = [
    { value: "ر.س", label: "ريال سعودي", code: "SAR" },
    { value: "$", label: "دولار أمريكي", code: "USD" },
    { value: "€", label: "يورو", code: "EUR" },
    { value: "ج.م", label: "جنيه مصري", code: "EGP" },
    { value: "د.إ", label: "درهم إماراتي", code: "AED" },
  ];

  const areaUnitOptions = [
    { value: "م²", label: "متر مربع" },
    { value: "قدم²", label: "قدم مربع" },
    { value: "فدان", label: "فدان" },
    { value: "هـ", label: "هكتار" },
  ];

  // Set mounted state and load settings
  useEffect(() => {
    setIsMounted(true);
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          currencyLabel:
            parsed.currencyLabel ||
            currencyOptions.find((c) => c.value === parsed.currency)?.label ||
            "جنيه مصري",
          areaUnitValue:
            parsed.areaUnitValue ||
            areaUnitOptions.find((a) => a.label === parsed.areaUnit)?.value ||
            "م²",
        }));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, [areaUnitOptions, currencyOptions]);

  // Only set up storage listener on client
  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = () => {
      const savedSettings = localStorage.getItem("appSettings");
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings((prev) => ({
            ...prev,
            ...parsed,
            currencyLabel:
              parsed.currencyLabel ||
              currencyOptions.find((c) => c.value === parsed.currency)?.label ||
              "جنيه مصري",
            areaUnitValue:
              parsed.areaUnitValue ||
              areaUnitOptions.find((a) => a.label === parsed.areaUnit)?.value ||
              "م²",
          }));
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isMounted, areaUnitOptions, currencyOptions]);

  // Only save to localStorage on client after mount
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings, isMounted]);

  // Rest of your component remains the same...
  const toggleDropdown = () => setIsOpen(!isOpen);

  const openSettingsModal = () => {
    setTempSettings({ ...settings });
    setShowModal(true);
    setIsOpen(false);
  };

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    setShowModal(false);
    window.location.reload();
  };

  const handleCurrencyChange = (value: string) => {
    const selected = currencyOptions.find((c) => c.value === value);
    if (selected) {
      setTempSettings((prev) => ({
        ...prev,
        currency: selected.value,
        currencyCode: selected.code,
        currencyLabel: selected.label,
      }));
    }
  };

  const handleAreaUnitChange = (value: string) => {
    const selected = areaUnitOptions.find((a) => a.value === value);
    if (selected) {
      setTempSettings((prev) => ({
        ...prev,
        areaUnit: selected.label,
        areaUnitValue: selected.value,
      }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Only render on client to avoid hydration mismatch
  if (!isMounted) return null;
  return (
    <div ref={dropdownRef} className="inline-block text-right">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-main focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Settings size={15} />
        <span className="ml-2">الإعدادات</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            <div className="border-b px-4 py-2 text-sm text-gray-700">
              <div className="flex items-center">
                <span className="ml-2 font-medium">العملة:</span>
                <span className="mr-auto">
                  {settings.currency} ({settings.currencyLabel})
                </span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="ml-2 font-medium">وحدة المساحة:</span>
                <span className="mr-auto">
                  {settings.areaUnitValue} ({settings.areaUnit})
                </span>
              </div>
            </div>
            <button
              onClick={openSettingsModal}
              className="block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              تغيير الإعدادات
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={() => setShowModal(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block w-full transform rounded-lg bg-white text-right align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg sm:align-middle">
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                  تغيير الإعدادات
                </h3>

                <div className="mb-4">
                  <Dropdown
                    id="currency"
                    label="اختر العملة"
                    options={currencyOptions.map((c) => ({
                      value: c.value,
                      label: c.label,
                    }))}
                    value={tempSettings.currency}
                    onChange={handleCurrencyChange}
                    className="mt-2"
                  />
                </div>

                <div className="mb-4">
                  <Dropdown
                    id="area-unit-selector"
                    label="اختر وحدة قياس المساحة"
                    options={areaUnitOptions}
                    value={tempSettings.areaUnitValue}
                    onChange={handleAreaUnitChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-main px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-main-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  حفظ
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyAreaDropdown;
