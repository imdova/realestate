import { useState, useEffect } from "react"; // Import useEffect
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import {
  GraduationCap,
  MapPin,
  Stethoscope,
  Store,
  Utensils,
  Volleyball,
} from "lucide-react";
import { RealEstateItem } from "@/types/real-estate";
import { useAppSettings } from "@/hooks/useAppSettings";

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
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

type PropertyModalProps = {
  property: RealEstateItem;
  onClose: () => void;
  isOpen: boolean;
};

const PropertyModal = ({ property, onClose, isOpen }: PropertyModalProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "nearby">("details");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);
  const { formatCurrency } = useAppSettings();

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { name, phoneNumber });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "school":
        return <GraduationCap size={15} />;
      case "restaurant":
        return <Utensils size={15} />;
      case "hospital":
        return <Stethoscope size={15} />;
      case "market":
        return <Store size={15} />;
      case "beach":
        return <Volleyball size={15} />;
      default:
        return <MapPin size={15} />;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      dir="rtl"
    >
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white">
        {/* Header */}
        <div className="bg-main p-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold md:text-xl">{property.title}</h2>
            <button
              onClick={onClose}
              className="text-2xl text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
          <p className="mt-2">{formatCurrency(property.price || 0)}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-main text-main" : "text-gray-600"}`}
            onClick={() => setActiveTab("details")}
          >
            تفاصيل الموقع
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "nearby" ? "border-b-2 border-main text-main" : "text-gray-600"}`}
            onClick={() => setActiveTab("nearby")}
          >
            الأماكن القريبة
          </button>
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto md:flex-row">
          {/* Content */}
          <div className="flex-1 md:min-h-[600px]">
            {activeTab === "details" ? (
              <div className="space-y-6 p-4">
                {/* Main Property Map */}
                <div className="h-96 overflow-hidden rounded-lg">
                  <MapContainer
                    center={[property.location.lat, property.location.lng]}
                    zoom={16}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      icon={window.customIcons["default"]}
                      position={[property.location.lat, property.location.lng]}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>{property.title}</strong>
                          <br />
                          <small>{property.location.address}</small>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-bold">تفاصيل العقار</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">نوع العقار:</span>
                        <span>{property.type}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">المساحة:</span>
                        <span>{property.area} م²</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">عدد الغرف:</span>
                        <span>{property.bedrooms}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">عدد الحمامات:</span>
                        <span>{property.bathrooms}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold">المرافق</h3>
                    <ul className="space-y-2">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <span className="ml-2">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-bold">الوصف</h3>
                  <p className="text-gray-700">{property.description}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-4">
                {/* Nearby Places Map */}
                <div className="h-96 overflow-hidden rounded-lg">
                  <MapContainer
                    center={[property.location.lat, property.location.lng]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      icon={
                        window.customIcons["default"] ||
                        window.customIcons.default
                      }
                      position={[property.location.lat, property.location.lng]}
                    >
                      <Popup>{property.title}</Popup>
                    </Marker>
                    {property.nearbyPlaces.map((place) => (
                      <Marker
                        icon={
                          window.customIcons[place.type] ||
                          window.customIcons.default
                        }
                        key={place.id}
                        position={place.location}
                      >
                        <Popup>
                          <div>
                            <strong>{place.name}</strong>
                            <br />
                            <small>المسافة: {place.distance}</small>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>

                {/* Nearby Places List */}
                <div>
                  <h3 className="mb-2 text-lg font-bold">
                    قائمة الأماكن القريبة
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {property.nearbyPlaces.filter((p) => p.type === "school")
                      .length > 0 && (
                      <div className="rounded-lg border p-3">
                        <h4 className="flex items-center gap-2 font-medium">
                          {getIcon("school")}
                          المدارس
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {property.nearbyPlaces
                            .filter((p) => p.type === "school")
                            .map((school) => (
                              <li key={school.id}>
                                {school.name} - {school.distance}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyPlaces.filter(
                      (p) => p.type === "restaurant",
                    ).length > 0 && (
                      <div className="rounded-lg border p-3">
                        <h4 className="flex items-center gap-2 font-medium">
                          {getIcon("restaurant")}
                          المطاعم
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {property.nearbyPlaces
                            .filter((p) => p.type === "restaurant")
                            .map((restaurant) => (
                              <li key={restaurant.id}>
                                {restaurant.name} - {restaurant.distance}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyPlaces.filter((p) => p.type === "hospital")
                      .length > 0 && (
                      <div className="rounded-lg border p-3">
                        <h4 className="flex items-center gap-2 font-medium">
                          {getIcon("hospital")}
                          المستشفيات
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {property.nearbyPlaces
                            .filter((p) => p.type === "hospital")
                            .map((hospital) => (
                              <li key={hospital.id}>
                                {hospital.name} - {hospital.distance}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyPlaces.filter((p) => p.type === "market")
                      .length > 0 && (
                      <div className="rounded-lg border p-3">
                        <h4 className="flex items-center gap-2 font-medium">
                          {getIcon("market")}
                          الأسواق
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {property.nearbyPlaces
                            .filter((p) => p.type === "market")
                            .map((market) => (
                              <li key={market.id}>
                                {market.name} - {market.distance}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {property.nearbyPlaces.filter((p) => p.type === "beach")
                      .length > 0 && (
                      <div className="rounded-lg border p-3">
                        <h4 className="flex items-center gap-2 font-medium">
                          {getIcon("beach")}
                          الشواطئ
                        </h4>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          {property.nearbyPlaces
                            .filter((p) => p.type === "beach")
                            .map((beach) => (
                              <li key={beach.id}>
                                {beach.name} - {beach.distance}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="border-t p-4">
            <h3 className="mb-2 text-lg font-bold">اتصل بالبائع</h3>
            <div className="mb-4 flex items-center">
              <span className="ml-2 font-medium">{property.agent.name}:</span>
              <span className="font-medium text-main">
                {property.agent.phone}
              </span>
            </div>

            {isSubmitted ? (
              <div className="rounded-lg bg-green-100 p-4 text-green-800">
                شكراً لتواصلك! سنقوم بالرد عليك في أقرب وقت ممكن.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-gray-700">
                    اسمك
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded border p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-gray-700">
                    رقم الهاتف
                  </label>
                  <div className="flex">
                    <select className="rounded-l border bg-gray-100 p-2">
                      <option>+20</option>
                      <option>+966</option>
                      <option>+971</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 rounded-r border p-2"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-main px-4 py-2 text-white transition hover:bg-[#1a4a7a]"
                >
                  إرسال
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
