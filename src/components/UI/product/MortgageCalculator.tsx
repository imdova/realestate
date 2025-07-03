"use client";

import { useAppSettings } from "@/hooks/useAppSettings";
import React, { useState, useEffect, useMemo } from "react";

type FormData = {
  propertyValue: number;
  downPayment: number;
  loanTerm: number;
};

const MortgageCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyValue: 40000000,
    downPayment: 8000000,
    loanTerm: 7,
  });
  const { formatCurrency } = useAppSettings();

  const interestRate = 5; // ثابت

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    loanAmount: 0,
  });

  const t = {
    title: "حاسبة التمويل العقاري",
    propertyValue: "قيمة العقار",
    downPayment: "الدفعة الأولية",
    loanTerm: "مدة القرض (سنوات)",
    interestRate: "سعر الفائدة (%)",
    monthlyPayment: "القسط الشهري ابتداءً من",
    totalPayment: "إجمالي مبلغ الفرض",
    totalInterest: "إجمالي الفائدة",
    loanAmount: "مبلغ القرض",
  };

  const calculateMortgage = () => {
    const loanAmount = formData.propertyValue - formData.downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;

    const monthlyPayment =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      loanAmount,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    setFormData((prev) => {
      // If property value changes, adjust down payment if it exceeds new value
      if (name === "propertyValue" && prev.downPayment > numericValue) {
        return {
          ...prev,
          [name]: numericValue,
          downPayment: numericValue,
        };
      }
      return {
        ...prev,
        [name]: numericValue,
      };
    });
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("ar-EG").format(value);
  };

  const getProgressPercentage = (value: number, max: number): number => {
    return (value / max) * 100;
  };

  // Calculate quarter values for property value markers
  const propertyValueMarkers = useMemo(() => {
    const quarter = formData.propertyValue / 4;
    return [
      0,
      Math.round(quarter),
      Math.round(quarter * 2),
      Math.round(quarter * 3),
      formData.propertyValue,
    ];
  }, [formData.propertyValue]);

  useEffect(() => {
    calculateMortgage();
  }, [formData]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
        <p className="text-gray-600">تم بحساب قيمة القسط الثقوي لهذا العقار</p>
      </div>
      <div
        dir="ltr"
        className="rounded-lg border border-gray-300 bg-white text-right"
      >
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <div className="flex-1 p-4">
            {/* Property Value */}
            <div>
              <div className="mb-2 flex justify-between">
                <label className="block text-gray-700">{t.propertyValue}</label>
                <span className="font-medium text-main">
                  {formatNumber(formData.propertyValue)} ج.م
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  name="propertyValue"
                  min="1000000"
                  max="100000000"
                  step="100000"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  className="h-2 w-full appearance-none rounded-full bg-gray-200 outline-none"
                  style={{
                    background: `linear-gradient(to right,  #6d0d57 0%, #6d0d57 ${getProgressPercentage(
                      formData.propertyValue,
                      100000000,
                    )}%, #e5e7eb ${getProgressPercentage(
                      formData.propertyValue,
                      100000000,
                    )}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>1M</span>
                  <span>25M</span>
                  <span>50M</span>
                  <span>75M</span>
                  <span>100M</span>
                </div>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="mb-2 flex justify-between">
                <label className="block text-gray-700">{t.downPayment}</label>
                <span className="font-medium text-main">
                  {formatNumber(formData.downPayment)} ج.م
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  name="downPayment"
                  min="0"
                  max={formData.propertyValue}
                  step="100000"
                  value={formData.downPayment}
                  onChange={handleChange}
                  className="h-2 w-full appearance-none rounded-full bg-gray-200 outline-none"
                  style={{
                    background: `linear-gradient(to right,  #6d0d57 0%, #6d0d57 ${getProgressPercentage(
                      formData.downPayment,
                      formData.propertyValue,
                    )}%, #e5e7eb ${getProgressPercentage(
                      formData.downPayment,
                      formData.propertyValue,
                    )}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  {propertyValueMarkers.map((value, index) => (
                    <span key={index}>{formatNumber(value)}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="mb-2 flex justify-between">
                <label className="block text-gray-700">{t.loanTerm}</label>
                <span className="font-medium text-main">
                  {formData.loanTerm} سنوات
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  name="loanTerm"
                  min="1"
                  max="30"
                  value={formData.loanTerm}
                  onChange={handleChange}
                  className="h-2 w-full appearance-none rounded-full bg-gray-200 outline-none"
                  style={{
                    background: `linear-gradient(to right, #6d0d57 0%, #6d0d57 ${getProgressPercentage(
                      formData.loanTerm,
                      32,
                    )}%, #e5e7eb ${getProgressPercentage(
                      formData.loanTerm,
                      32,
                    )}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            input[type="range"] {
              -webkit-appearance: none;
            }
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              background-color: white;
              border: 3px solid var(--main-color);
              border-radius: 50%;
              cursor: pointer;
              margin-top: -9px;
            }
            input[type="range"]::-moz-range-thumb {
              height: 20px;
              width: 20px;
              background-color: white;
              border: 3px solid var(--main-color);
              border-radius: 50%;
              cursor: pointer;
            }
            input[type="range"]::-webkit-slider-runnable-track {
              height: 2px;
              background: transparent;
            }
            input[type="range"]::-moz-range-track {
              height: 2px;
              background: transparent;
            }
          `}</style>
          {/* Results Section */}
          <div className="space-y-6 border-t p-4 md:w-1/3 md:border-r">
            <div className="pb-4">
              <h2 className="text-sm font-semibold text-gray-500">
                {t.monthlyPayment}
              </h2>
              <p className="text-2xl font-bold">
                {formatCurrency(results.monthlyPayment)}
              </p>
            </div>

            <div className="pb-4">
              <h3 className="text-sm font-semibold text-gray-500">
                {t.totalPayment}
              </h3>
              <p className="text-2xl font-bold">
                {formatCurrency(results.totalPayment)}
              </p>
            </div>
            <button className="rounded-md bg-main px-4 py-2 text-white transition hover:bg-main-dark">
              قسط الان
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
