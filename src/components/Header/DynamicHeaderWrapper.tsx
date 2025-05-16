"use client";

import DynamicHeader from "@/components/Header/DynamicHeader";
import useScrollDetection from "@/hooks/useScrollDetection";

export default function DynamicHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isScrolled = useScrollDetection();

  return (
    <>
      <DynamicHeader />
      <main
        style={{ paddingTop: isScrolled ? "70px" : undefined }}
        className="h-[1000px]"
      >
        {children}
      </main>
    </>
  );
}
