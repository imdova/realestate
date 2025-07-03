import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useAppSettings } from "@/hooks/useAppSettings";

// Dynamic import to avoid SSR issues with ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PriceTrendChartProps {
  prices: number[];
  months?: string[];
  title?: string;
  subtitle?: string;
  currency?: string;
  showAnnotations?: boolean;
  showGradient?: boolean;
}

const PriceTrendChart: React.FC<PriceTrendChartProps> = ({
  prices = [
    65000000, 60000000, 55000000, 50000000, 45000000, 40000000, 35000000,
  ],
  months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"],
  title = "عنوان 1",
  subtitle = "عنوان 2",
  currency = "EGP",
  showAnnotations = true,
  showGradient = true,
}) => {
  const { formatCurrency } = useAppSettings();
  // Format prices for display
  const formattedPrices = prices.map((price) => {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  });

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 450,
      fontFamily: "cairo, sans-serif",
      foreColor: "#374151",
      toolbar: {
        show: false,
      },
      background: "transparent",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ["#6d0d57"],
    fill: showGradient
      ? {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100],
          },
        }
      : undefined,
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },
    markers: {
      size: 6,
      colors: ["#6d0d57"],
      strokeColors: "#FFFFFF",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
      shape: "circle",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "cairo, sans-serif",
          fontWeight: 500,
        },
      },
      axisBorder: {
        show: true,
        color: "#E5E7EB",
      },
      axisTicks: {
        show: true,
        color: "#E5E7EB",
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return formatCurrency(value);
        },
        style: {
          fontSize: "12px",
          fontFamily: "cairo, sans-serif",
          fontWeight: 500,
        },
      },
      title: {
        style: {
          fontSize: "14px",
          fontFamily: "cairo, sans-serif",
          fontWeight: "bold",
        },
      },
      axisBorder: {
        show: true,
        color: "#E5E7EB",
      },
      axisTicks: {
        show: true,
        color: "#E5E7EB",
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "cairo, sans-serif",
        fontSize: "14px",
      },
      y: {
        formatter: (value) => formattedPrices[prices.indexOf(value)],
        title: {
          formatter: () => "السعر:",
        },
      },
      marker: {
        show: true,
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
        breakpoint: 1024,
        options: {
          chart: {
            height: 400,
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
          markers: {
            size: 4,
          },
          annotations: showAnnotations
            ? {
                points: prices.map((price, index) => ({
                  x: months[index],
                  y: price,
                  label: {
                    offsetY: -15,
                  },
                })),
              }
            : undefined,
        },
      },
    ],
  };

  const series = [
    {
      name: "سعر الفيلا",
      data: prices,
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="p-0 sm:p-6">
        <div className="mb-2">
          <h2 className="mb-1 text-lg font-bold text-gray-800">{title}</h2>
          <h3 className="text-sm text-gray-600">{subtitle}</h3>
        </div>
        <div className="h-[320px] md:h-[450px]">
          <Chart
            options={options}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;
