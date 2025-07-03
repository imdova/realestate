import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useAppSettings } from "@/hooks/useAppSettings";

// Dynamic import to avoid SSR issues with ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LocationData {
  id: number;
  name: string;
  pricePerSqm: number;
  changePercentage: number;
  changeDirection: "up" | "down";
  comparisonColor: string;
}

interface ComparativeAnalysisProps {
  ChartTitle?: string;
  ChartSubtitle?: string;
  TableTitle?: string;
  TableSubtitle?: string;
  locations?: LocationData[];
  disclaimer?: string;
  dataSource?: string;
  data: number[];
}

const ComparativeAnalysis: React.FC<ComparativeAnalysisProps> = ({
  ChartTitle,
  ChartSubtitle,
  TableTitle,
  TableSubtitle,
  data,
  locations = [
    {
      id: 1,
      name: "سيدي عبد الرحمن",
      pricePerSqm: 60400,
      changePercentage: 2.3,
      changeDirection: "up",
      comparisonColor: "#10B981",
    },
    {
      id: 2,
      name: "العامين",
      pricePerSqm: 122200,
      changePercentage: -5.5,
      changeDirection: "down",
      comparisonColor: "#EF4444",
    },
    {
      id: 3,
      name: "رأس الحكمة",
      pricePerSqm: 160900,
      changePercentage: -21.3,
      changeDirection: "down",
      comparisonColor: "#EF4444",
    },
    {
      id: 4,
      name: "سول",
      pricePerSqm: 190300,
      changePercentage: -16.8,
      changeDirection: "down",
      comparisonColor: "#EF4444",
    },
    {
      id: 5,
      name: "سيلفر ساندس",
      pricePerSqm: 125000,
      changePercentage: 0,
      changeDirection: "up",
      comparisonColor: "#10B981",
    },
  ],
  disclaimer = "يتم اكتساب هذا البحث الشائع باستخدام دوازومية عقارية استناداً إلى أسعار العقارات الممتلة على بيوت.",
  dataSource = "يستند البحث الشائع إلى عمليات البحث التي تلم بها مستخدمي بيوت خلال آخر 3 شهور.",
}) => {
  const { formatCurrency } = useAppSettings();

  // Prepare data for the chart
  const chartSeries = [
    {
      name: "معدل السعر/متر مربع",
      data: data,
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "cairo, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#6d0d57"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["معدل السعر/متر مربع", "سعر الطلب"],
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "cairo, sans-serif",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "12px",
          fontFamily: "cairo, sans-serif",
        },
      },
      labels: {
        formatter: (value) => {
          return new Intl.NumberFormat("ar-EG").format(value);
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return formatCurrency(value);
        },
      },
      style: {
        fontFamily: "cairo, sans-serif",
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      padding: {
        top: 20,
        right: 20,
        bottom: 0,
        left: 20,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              columnWidth: "20%",
            },
          },
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800">{ChartTitle}</h2>
              <h3 className="mt-1 text-sm text-gray-600">{ChartSubtitle}</h3>
            </div>
            <div className="h-[350px]">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height="100%"
                width="100%"
              />
            </div>
          </div>

          <div className="grid lg:col-span-4">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800">{TableTitle}</h2>
              <h3 className="mt-1 text-sm text-gray-600">{TableSubtitle}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[400px] divide-y divide-gray-200 rounded-lg border border-gray-200">
                <thead className="bg-gray-50 text-right">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      المنطقة
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      السعر لكل متر
                    </th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                      النسبة المئوية
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-right">
                  {locations.map((location) => (
                    <tr
                      key={location.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">
                        {location.name}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold">
                        {formatCurrency(location.pricePerSqm)}
                      </td>
                      <td className="px-4 py-4">
                        <div
                          className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${
                            location.changeDirection === "up"
                              ? "text-green-800"
                              : "text-red-800"
                          }`}
                        >
                          {location.changeDirection === "up" ? (
                            <svg
                              className="ml-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="ml-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )}
                          {location.changePercentage} %
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">{disclaimer}</p>
          <p className="mt-1 text-sm text-gray-500">{dataSource}</p>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
