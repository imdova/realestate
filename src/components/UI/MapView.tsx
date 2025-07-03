"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center bg-gray-100">
        Loading map...
      </div>
    ),
  },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const MapView = ({
  center,
  zoom = 15,
  position = [0, 0],
  className = "",
  children,
}: {
  center: [number, number];
  zoom?: number;
  position: [number, number];
  className?: string;
  children?: React.ReactNode;
}) => {
  const [iconsReady, setIconsReady] = useState(false);

  useEffect(() => {
    import("leaflet").then((L) => {
      if (!window.customIcons) {
        const createIcon = (iconUrl: string) =>
          L.icon({
            iconUrl,
            iconSize: [24, 24],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });

        window.customIcons = {
          school: createIcon("/icons/school.png"),
          restaurant: createIcon("/icons/restaurant.png"),
          hospital: createIcon("/icons/hospital.png"),
          market: createIcon("/icons/market.png"),
          beach: createIcon("/icons/beach.png"),
          default: createIcon("/icons/default.png"),
        };
      }

      setIconsReady(true);
    });
  }, []);

  if (!iconsReady) return null;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={`${className} rounded-lg`}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} icon={window.customIcons["default"]}></Marker>

      {children}
    </MapContainer>
  );
};

export default MapView;
