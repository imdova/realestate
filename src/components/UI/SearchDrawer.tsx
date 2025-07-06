import { Search, X, Clock, ArrowUpLeft, Home } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResult } from "@/types";
import { dummyKeywords } from "@/constants/keywords";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import IconButton from "./Buttons/IconButton";

const SearchDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const drawerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Match against dummy keywords
      const matchedKeywords = dummyKeywords
        .filter((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase()),
        )
        .map((keyword, index) => ({
          id: `keyword-${index}`,
          title: keyword,
          type: "recent" as const,
        }));

      // Also include recent searches that match
      const matchedRecentSearches = recentSearches
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        )
        .map((item) => ({
          ...item,
          type: "recent" as const,
        }));

      const results = [...matchedKeywords, ...matchedRecentSearches];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }

    setSelectedResultIndex(-1);
  };

  // Save a search to recent searches
  const saveToRecentSearches = (title: string) => {
    // Avoid duplicates
    if (
      !recentSearches.some(
        (item) => item.title.toLowerCase() === title.toLowerCase(),
      )
    ) {
      setRecentSearches((prev) => [
        { id: `recent-${Date.now()}`, title, type: "recent" },
        ...prev.slice(0, 4), // Keep only 5 most recent
      ]);
    }
  };

  // Perform search and update URL
  const performSearch = (query: string) => {
    if (query.trim()) {
      saveToRecentSearches(query);
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
    }
    onClose();
    setSearchResults([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedResultIndex >= 0 && searchResults.length > 0) {
        const selectedResult = searchResults[selectedResultIndex];
        setSearchQuery(selectedResult.title);
        performSearch(selectedResult.title);
      } else if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  // Handle click outside to close drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <motion.div
          ref={drawerRef}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-white shadow-xl"
        >
          <div dir="rtl" className="container mx-auto px-4 py-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row">
              {/* Logo */}
              <div className="hidden items-center md:flex">
                <Link
                  href="/"
                  className="flex items-end gap-1 text-2xl font-bold text-gray-800"
                >
                  عقاري{" "}
                  <span className="block h-[5px] w-[5px] rounded-full bg-main"></span>
                </Link>
              </div>

              <div className="relative w-full max-w-3xl flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="عن ماذا تبحث؟"
                  className="w-full rounded-lg border border-gray-300 p-2 pl-10 pr-10 text-lg outline-none transition-all duration-200 placeholder:text-sm focus:outline-none md:p-4 md:pr-12"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <button
                  onClick={onClose}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="hidden flex-row-reverse items-center gap-3 lg:flex">
                <IconButton className="block" href="/" Icon={Home} />
              </div>
            </div>

            {/* Dropdown results */}
            <div className="mt-2 max-h-[60vh] overflow-y-auto">
              {!searchQuery && recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="mb-2 flex items-center justify-between px-2 py-1">
                    <div className="flex items-center text-xs font-semibold tracking-wider text-gray-500">
                      <Clock className="ml-2 h-3 w-3" />
                      عمليات البحث الأخيرة
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      مسح الكل
                    </button>
                  </div>
                  {recentSearches.map((result) => (
                    <div
                      key={`recent-${result.id}`}
                      className="flex cursor-pointer items-center justify-between rounded px-3 py-3 hover:bg-gray-100"
                      onClick={() => {
                        setSearchQuery(result.title);
                        performSearch(result.title);
                      }}
                    >
                      <div className="flex items-center">
                        <span className="text-sm">{result.title}</span>
                      </div>
                      <ArrowUpLeft className="text-gray-400" size={15} />
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && (
                <div className="p-2">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-2 py-1 text-xs font-semibold tracking-wider text-gray-500">
                        اقتراحات
                      </div>
                      {searchResults.map((result, index) => (
                        <div
                          key={`result-${result.id}`}
                          className={`cursor-pointer rounded px-3 py-3 ${selectedResultIndex === index ? "bg-gray-100" : "hover:bg-gray-100"}`}
                          onClick={() => {
                            setSearchQuery(result.title);
                            performSearch(result.title);
                          }}
                        >
                          <div className="text-sm">{result.title}</div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="p-3 text-center text-sm text-gray-500">
                      لا توجد اقتراحات لـ {searchQuery}
                    </div>
                  )}

                  <div
                    className="mt-1 cursor-pointer rounded bg-gray-50 px-3 py-3 text-sm font-medium hover:bg-gray-100"
                    onClick={() => performSearch(searchQuery)}
                  >
                    ابحث عن {searchQuery}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchDrawer;
