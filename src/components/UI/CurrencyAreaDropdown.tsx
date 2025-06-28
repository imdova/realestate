import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

type Settings = {
  currency: string;
  areaUnit: string;
};

const CurrencyAreaDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    currency: "SAR",
    areaUnit: "متر مربع",
  });
  const [showModal, setShowModal] = useState(false);
  const [tempSettings, setTempSettings] = useState<Settings>({ ...settings });
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Available options
  const currencies = [
    { value: "ر.س", label: "ريال سعودي" }, // SAR
    { value: "د.أ", label: "دولار أمريكي" }, // USD
    { value: "ي", label: "يورو" }, // EUR
    { value: "ج.م", label: "جنيه مصري" }, // EGP
    { value: "د.إ", label: "درهم إماراتي" }, // AED
  ];

  const areaUnits = [
    { value: "م²", label: "متر مربع" }, // sqm
    { value: "قدم²", label: "قدم مربع" }, // sqft
    { value: "فدان", label: "فدان" }, // acre
    { value: "هـ", label: "هكتار" }, // hectare
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
      setTempSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    // You can add logic here to update the settings globally in your app
  }, [settings]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openSettingsModal = () => {
    setTempSettings({ ...settings });
    setShowModal(true);
    setIsOpen(false);
  };

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    setShowModal(false);
    // Refresh the page to apply changes globally
    router.refresh();
  };

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find((c) => c.value === value);
    if (selectedCurrency) {
      setTempSettings({
        ...tempSettings,
        currency: selectedCurrency.value,
      });
    }
  };

  const handleAreaUnitChange = (value: string) => {
    const selectedAreaUnit = areaUnits.find((a) => a.value === value);
    if (selectedAreaUnit) {
      setTempSettings({
        ...tempSettings,
        areaUnit: selectedAreaUnit.label,
      });
    }
  };

  return (
    <div ref={dropdownRef} className="inline-block text-right">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-main focus:outline-none"
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
                <span className="ml-2 font-medium">العملة الحالية:</span>
                <span className="mr-auto">{settings.currency}</span>
              </div>
              <div className="mt-1 flex items-center">
                <span className="ml-2 font-medium">وحدة المساحة:</span>
                <span className="mr-auto">{settings.areaUnit}</span>
              </div>
            </div>
            <button
              onClick={openSettingsModal}
              className="block w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              تغيير الإعدادات
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-right align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
                  تغيير الإعدادات
                </h3>
                <div className="mb-4">
                  <Dropdown
                    id="currency"
                    label="اختر العملة"
                    options={currencies}
                    value={tempSettings.currency}
                    onChange={handleCurrencyChange}
                    className="mt-2"
                  />
                </div>

                <div className="mb-4">
                  <Dropdown
                    id="area-unit-selector"
                    label="اختر وحدة قياس المساحة"
                    options={areaUnits}
                    value={
                      areaUnits.find((u) => u.label === tempSettings.areaUnit)
                        ?.value || "sqm"
                    }
                    onChange={handleAreaUnitChange}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

// to get settengs data
// settings.currency and settings.areaUnit will be available
// const settings = JSON.parse(localStorage.getItem("appSettings") || "{}");
