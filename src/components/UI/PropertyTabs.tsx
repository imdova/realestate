// components/PropertyTabs.tsx
import { useState } from "react";

type PropertyItem = {
  id: string;
  name: string;
};

type PropertyCategory = {
  id: string;
  name: string;
  items: PropertyItem[];
  showAll?: boolean;
};

type TabData = {
  id: string;
  label: string;
  categories: PropertyCategory[];
};

const PropertyTabs = () => {
  // Dummy data matching the screenshot
  const tabsData: TabData[] = [
    {
      id: "for-sale",
      label: "للبيع",
      categories: [
        {
          id: "chalets",
          name: "شاليهات",
          items: [
            { id: "chalets-egypt", name: "شاليهات البيع في مصر" },
            { id: "chalets-maris", name: "شاليهات البيع في مرسى مطروح" },
            { id: "chalets-salt", name: "شاليهات البيع في الساحل الشمالي" },
            { id: "chalets-ain", name: "شاليهات البيع في العين السخنة" },
            { id: "chalets-sousse", name: "شاليهات البيع في السويس" },
            { id: "chalets-alex", name: "شاليهات البيع في الاسكندرية" },
            { id: "chalets-redsea", name: "شاليهات البيع في البحر الأحمر" },
          ],
        },
        {
          id: "townhouses",
          name: "تاون هاوس",
          items: [
            { id: "townhouses-egypt", name: "تاون هاوس البيع في مصر" },
            { id: "townhouses-giza", name: "تاون هاوس البيع في الجيزة" },
            { id: "townhouses-cairo", name: "تاون هاوس البيع في القاهرة" },
            { id: "townhouses-maris", name: "تاون هاوس البيع في مرسى مطروح" },
            {
              id: "townhouses-redsea",
              name: "تاون هاوس البيع في البحر الأحمر",
            },
            { id: "townhouses-october", name: "تاون هاوس البيع في 6 أكتوبر" },
          ],
        },
        {
          id: "compounds-sheikh",
          name: "كمبوندات في الشيخ زايد",
          items: [
            { id: "sz-1", name: "كمبوندات في كمبوند زايد وست" },
            { id: "sz-2", name: "كمبوندات في كمبوند سيريناد" },
            { id: "sz-3", name: "كمبوندات في كمبوند جاردنيا" },
            { id: "sz-4", name: "كمبوندات في كمبوند زايد بلاس" },
            { id: "sz-5", name: "كمبوندات في كمبوند كليوباترا سكوير" },
            { id: "sz-6", name: "كمبوندات في كمبوند لافونتين" },
          ],
        },
        {
          id: "compounds-october",
          name: "كمبوندات في 6 أكتوبر",
          items: [
            { id: "oct-1", name: "كمبوندات في كمبوند زايد" },
            { id: "oct-2", name: "كمبوندات في كمبوند وست" },
            { id: "oct-3", name: "كمبوندات في كمبوند جاردنز" },
            { id: "oct-4", name: "كمبوندات في كمبوند داون تاون" },
            { id: "oct-5", name: "كمبوندات في كمبوند أكتوبر جيتس" },
          ],
        },
        {
          id: "apartments",
          name: "شقق",
          items: [
            { id: "apartments-egypt", name: "شقق البيع في مصر" },
            { id: "apartments-cairo", name: "شقق البيع في القاهرة" },
            { id: "apartments-alex", name: "شقق البيع في الاسكندرية" },
            { id: "apartments-october", name: "شقق البيع في 6 أكتوبر" },
            { id: "apartments-nasr", name: "شقق البيع في مدينة نصر" },
          ],
        },
        {
          id: "duplex",
          name: "دوبلكس",
          items: [
            { id: "duplex-egypt", name: "دوبلكس البيع في مصر" },
            { id: "duplex-cairo", name: "دوبلكس البيع في القاهرة" },
            { id: "duplex-giza", name: "دوبلكس البيع في الجيزة" },
            { id: "duplex-maris", name: "دوبلكس البيع في مرسى مطروح" },
            { id: "duplex-redsea", name: "دوبلكس البيع في البحر الأحمر" },
          ],
        },
      ],
    },
    {
      id: "for-rent",
      label: "للايجار",
      categories: [
        {
          id: "chalets-rent",
          name: "شاليهات",
          items: [
            { id: "chalets-rent-egypt", name: "شاليهات الايجار في مصر" },
            { id: "chalets-rent-maris", name: "شاليهات الايجار في مرسى مطروح" },
            {
              id: "chalets-rent-salt",
              name: "شاليهات الايجار في الساحل الشمالي",
            },
          ],
        },
        {
          id: "apartments-rent",
          name: "شقق",
          items: [
            { id: "apartments-rent-egypt", name: "شقق الايجار في مصر" },
            { id: "apartments-rent-cairo", name: "شقق الايجار في القاهرة" },
          ],
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [categories, setCategories] = useState<PropertyCategory[]>(
    tabsData[0].categories,
  );

  const toggleShowAll = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, showAll: !category.showAll }
          : category,
      ),
    );
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const newTab = tabsData.find((tab) => tab.id === tabId);
    if (newTab) {
      setCategories(
        newTab.categories.map((cat) => ({ ...cat, showAll: false })),
      );
    }
  };

  return (
    <div className="arabic-font mx-auto max-w-6xl rounded-lg bg-white p-4 shadow-sm">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          عمليات البحث الشائعة في مصر
        </h1>
      </div>

      {/* Main Tabs (للبيع/للايجار) */}
      <div className="mb-6">
        <div className="flex justify-center gap-6">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-1 py-2 text-lg font-medium focus:outline-none ${
                activeTab === tab.id
                  ? "border-b-2 border-main"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-gray-700">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-3">
                {(category.showAll
                  ? category.items
                  : category.items.slice(0, 5)
                ).map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className="block p-2 text-main transition-colors"
                  >
                    <p className="hover:underline">{item.name}</p>
                  </a>
                ))}
              </div>
              {category.items.length > 5 && (
                <div className="flex items-center gap-4">
                  <span className="block h-[1px] flex-1 bg-gray-200"></span>
                  <button
                    onClick={() => toggleShowAll(category.id)}
                    className="flex items-center text-sm font-semibold text-gray-800"
                  >
                    {category.showAll ? "عرض اقل" : "عرض المزيد"}
                    <svg
                      className={`mr-1 h-4 w-4 transform transition-transform ${
                        category.showAll ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTabs;
