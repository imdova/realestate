"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundClient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-[#6d0d57] opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl font-semibold text-[#6d0d57]">
              الصفحة غير موجودة
            </h2>
          </div>
        </div>

        <p className="mb-8 text-lg text-gray-600">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.
        </p>

        <Link href="/">
          <button className="transform rounded-lg bg-[#6d0d57] px-6 py-3 font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:bg-[#5a0a47]">
            العودة إلى الصفحة الرئيسية
          </button>
        </Link>

        <p className="mt-8 text-sm text-gray-500">
          إذا كنت تعتقد أن هذا خطأ، يرجى الاتصال بنا
        </p>
      </div>
    </motion.div>
  );
}
