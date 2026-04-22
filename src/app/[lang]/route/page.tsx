"use client";

import dynamic from "next/dynamic";

const TourMap = dynamic(
  () => import("@/components/tour-map").then((m) => m.TourMap),
  { ssr: false }
);

export default function RoutePage() {
  return <TourMap />;
}
