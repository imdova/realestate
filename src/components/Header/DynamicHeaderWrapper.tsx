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
      <main>{children}</main>
    </>
  );
}
