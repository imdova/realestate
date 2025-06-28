import { MapPin, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Location {
  id: string;
  name: string;
  region?: string;
  parent?: string;
}

const LocationSearch = ({
  selectedLocation,
  setSelectedLocation,
}: {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dummy data matching your image
  const locations: Location[] = [
    { id: "1", name: "الإسكندرية" },
    { id: "2", name: "العلمين", region: "السلط الشمالي، مطروح" },
    { id: "3", name: "العين السخنة", region: "السويس" },
    { id: "4", name: "البروج", region: "مدينة الشروق، القاهرة" },
    {
      id: "5",
      name: "بيت الوطن",
      region: "التجمع الخاصم، القاهرة الجديدة، القاهرة",
    },
    { id: "6", name: "أليفا المستقبل سيتي", region: "مدينة المستقبل، القاهرة" },
    { id: "7", name: "المقصد", region: "العاصمة الإدارية الجديدة، القاهرة" },
    { id: "8", name: "زهراء المعادي", region: "القاهرة" },
    { id: "9", name: "أمواج", region: "سبدي عبد الرحمن، السلط الشمالي، مطروح" },
  ];

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.region &&
        location.region.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedLocation(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex w-full cursor-text items-center rounded-lg border border-gray-300`}
        onClick={() => setIsOpen(true)}
      >
        {selectedLocation ? (
          <div className="flex w-full items-center justify-between p-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs font-medium text-gray-900">
                  {selectedLocation.name}
                </p>
                {selectedLocation.region && (
                  <p className="text-[10px] text-gray-500">
                    {selectedLocation.region}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-2.5">
            <MapPin className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن موقع..."
              className="flex-1 text-right outline-none placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-lg bg-white py-2 shadow-lg">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div
                key={location.id}
                className="cursor-pointer px-4 py-2 text-right hover:bg-gray-50"
                onClick={() => handleSelect(location)}
              >
                <p className="text-sm font-medium text-gray-900">
                  {location.name}
                </p>
                {location.region && (
                  <p className="text-xs text-gray-500">{location.region}</p>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-gray-500">
              لا توجد نتائج
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
