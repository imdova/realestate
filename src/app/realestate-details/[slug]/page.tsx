"use client";
import EmailContactForm from "@/components/forms/EmailContactForm";
import AdBanner from "@/components/UI/AdBanner";
import ContactUsModal from "@/components/UI/Modals/ContactUsModal";
import AgentCard from "@/components/UI/product/AgentCard";
import RealestateBreadcrumbs from "@/components/UI/product/RealestateBreadcrumbs";
import RealestateDetails from "@/components/UI/product/RealestateDetails";
import RealestateGallery from "@/components/UI/product/RealestateGallery";
import SimilarProperties from "@/components/UI/product/SimilarProperties";
import { realEstateData } from "@/constants/realestate";
import useScrollDetection from "@/hooks/useScrollDetection";
import { MapPin, MessageSquare, Phone, TrendingUp, Grip } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface RealestatePageProps {
  params: Promise<{ slug: string }>;
}
type SectionRefs = {
  [key: string]: HTMLElement | null;
};

export default function RealestatePage({ params }: RealestatePageProps) {
  const { slug } = React.use(params);
  const [emailIsOpen, setEmailIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const sections = [
    {
      id: "تفاصيل",
      icon: Grip,
      label: "تفاصيل",
    },
    {
      id: "بحث شائع",
      icon: TrendingUp,
      label: "بحث شائع",
    },
    {
      id: "المواقع والاماكن القريبة",
      icon: MapPin,
      label: "الاماكن القريبة",
    },
  ];
  const isScrolled = useScrollDetection(1000);
  const [activeTab, setActiveTab] = useState<string>(sections[0].id);
  const sectionRefs = useRef<SectionRefs>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Register section callback
  const registerSectionRef = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current[id] = element;
        if (observerRef.current) {
          observerRef.current.observe(element);
        }
      } else {
        if (sectionRefs.current[id] && observerRef.current) {
          observerRef.current.unobserve(sectionRefs.current[id]!);
          delete sectionRefs.current[id];
        }
      }
    },
    [],
  );

  // Initialize observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50px 0px -40% 0px", // More precise detection
        threshold: [0.1, 0.5, 0.9], // Multiple thresholds for better detection
      },
    );

    // Observe existing refs
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const realestate = realEstateData.find(
    (realestate) => realestate.id === slug,
  );

  if (!realestate) {
    return notFound();
  }

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerHeight = 80; // Match your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      // First force the active tab
      setActiveTab(sectionId);

      // Then scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Fallback check after scroll completes
      setTimeout(() => {
        const currentPos = element.getBoundingClientRect().top;
        if (currentPos > headerHeight + 50 || currentPos < 0) {
          // If not properly visible, scroll again
          window.scrollTo({
            top: offsetPosition,
            behavior: "auto", // Instant this time
          });
        }
      }, 1000);
    }
  };
  return (
    <div>
      <nav
        className={`${
          !isScrolled && "hidden"
        } fixed top-0 z-20 w-full bg-white shadow-md`}
      >
        <div className="container mx-auto px-4 py-3 lg:max-w-[1300px]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex w-full justify-between gap-2 py-4 md:w-fit md:gap-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 text-xs font-medium transition-colors md:text-sm ${
                    activeTab === section.id
                      ? "text-main"
                      : "text-gray-600 hover:text-main"
                  }`}
                >
                  {section.icon && (
                    <section.icon className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                  {section.label}
                </button>
              ))}
            </div>

            <div className="hidden gap-3 md:flex">
              <button
                onClick={() => setContactIsOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-main px-3 py-2 text-sm font-medium text-white hover:bg-main-dark"
              >
                <Phone className="h-4 w-4" />
                <span>اتصل</span>
              </button>
              <button
                onClick={() => setEmailIsOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-main px-3 py-2 text-sm font-medium text-main hover:bg-gray-50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>الايميل</span>
              </button>
              <Link
                href={`https://wa.me/${realestate.agent.phone.replace(/\D/g, "")}`}
                className="flex items-center justify-center gap-1 space-x-reverse rounded-lg border border-main fill-main px-3 py-1 text-xs font-medium text-main"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                >
                  <path
                    fillRule="evenodd"
                    d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
                  ></path>
                </svg>{" "}
                واتس اب
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-2 lg:max-w-[1300px]">
        <div className="no-scrollbar overflow-x-auto">
          <nav className="min-w-[550px] py-2">
            <RealestateBreadcrumbs
              realestateType={realestate.type}
              realestateTitle={realestate.title}
            />
          </nav>
        </div>

        <RealestateGallery
          videos={realestate.videos}
          images={realestate.images}
          location={realestate.location}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 xl:grid-cols-11">
          {/* Left Column */}
          <div className="lg:col-span-5 xl:col-span-8">
            <RealestateDetails
              realestate={realestate}
              registerSectionRef={registerSectionRef}
              activeTab={activeTab}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 lg:col-span-2 xl:col-span-3">
            <div className="hidden md:block">
              <AgentCard agent={realestate.agent} />
            </div>
            <AdBanner
              imageUrl="https://tpc.googlesyndication.com/simgad/17053811106047963002"
              targetUrl="/promotions/summer-sale"
              altText="Summer property sale"
            />

            <div>
              <SimilarProperties
                currentLocation={realestate.location.address}
              />
            </div>

            <div>
              <AdBanner
                imageUrl="https://tpc.googlesyndication.com/simgad/3551338568358180112"
                targetUrl="/promotions/summer-sale"
                altText="Summer property sale"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed ${!isScrolled && "hidden"} bottom-0 z-50 flex w-full gap-2 border-t border-gray-200 bg-white p-4 shadow-md md:hidden`}
        dir="rtl"
      >
        <button
          onClick={() => setContactIsOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-main px-4 py-3 text-sm font-medium text-white hover:bg-main-dark"
        >
          <Phone className="h-4 w-4" />
          <span className="text-xs md:text-base">اتصل</span>
        </button>
        <button
          onClick={() => setEmailIsOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-main px-4 py-3 text-sm font-medium text-main hover:bg-gray-50"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs md:text-base">الايميل</span>
        </button>
        <Link
          href={`https://wa.me/${realestate.agent.phone.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1 space-x-reverse rounded-lg border border-main fill-main px-3 py-1 font-medium text-main"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="16"
            height="16"
            viewBox="0 0 32 32"
          >
            <path
              fillRule="evenodd"
              d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
            ></path>
          </svg>{" "}
          <span className="hidden text-xs sm:block md:text-base">واتس اب</span>
        </Link>
      </div>
      <EmailContactForm
        isModalOpen={emailIsOpen}
        setIsModalOpen={setEmailIsOpen}
      />
      <ContactUsModal
        isOpen={contactIsOpen}
        onClose={() => setContactIsOpen(false)}
        referenceNumber="FixayX-1016"
        contactPerson={realestate.agent}
      />
    </div>
  );
}
