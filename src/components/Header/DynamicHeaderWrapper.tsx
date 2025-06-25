"use client";

import DynamicHeader from "@/components/Header/DynamicHeader";

export default function DynamicHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DynamicHeader />
      <main className="h-[1000px]">{children}</main>
    </>
  );
}
