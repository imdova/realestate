import { Broker } from "@/types/real-estate";
import { Gem, Home, MessageSquare, Phone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ContactUsModal from "../Modals/ContactUsModal";
import EmailContactForm from "@/components/forms/EmailContactForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CardProps {
  broker: Broker;
}

function renderBadges(badges: string[]) {
  return badges.map((badge, index) => {
    let badgeContent = (
      <span className="flex items-center gap-1">
        {badge} <Gem size={15} />
      </span>
    );

    if (badge === "TruBroker") {
      badgeContent = <span>{badge}™</span>;
    } else if (badge === "معلن بجودة عالية") {
      badgeContent = (
        <span className="flex items-center gap-1">
          {badge} <Gem size={15} />
        </span>
      );
    } else if (badge === "سريع الاستجابة") {
      badgeContent = (
        <span className="flex items-center gap-1">
          {badge} <Phone size={15} />
        </span>
      );
    }

    return (
      <span
        key={index}
        className="flex gap-2 rounded-md bg-main px-2 py-1 text-[10px] font-medium text-white"
      >
        {badgeContent}
      </span>
    );
  });
}

const BrokerCard: React.FC<CardProps> = ({ broker }) => {
  const router = useRouter();
  const [emailIsOpen, setEmailIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the click originated from a button or its children
    const target = e.target as HTMLElement;
    const isButtonClick =
      target.closest("button") ||
      target.closest("a") ||
      target.tagName === "BUTTON" ||
      target.tagName === "A";

    if (!isButtonClick) {
      router.push(`/brokers/${broker.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="max-w-4xl cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-4 lg:flex-row">
        <div>
          <Image
            className="h-[200px] w-full object-cover lg:w-[200px]"
            src={broker.image}
            width={400}
            height={400}
            alt={broker.name}
          />
        </div>
        <div className="ml-4 flex-1 p-2">
          <h1 className="text-2xl font-bold text-gray-800">{broker.name}</h1>

          <div className="my-2 flex gap-2">{renderBadges(broker.badges)}</div>
          <span className="mt-2 text-sm">{broker.agency.name}</span>

          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Home size={15} /> <b>{broker.sale + broker.rent}</b> عقارات
            </div>
            <div className="flex items-center gap-2 text-sm">
              يتحدث <b>{broker.language.join(" , ")}</b>
            </div>
          </div>

          <div className="relative mt-4 flex items-center gap-3">
            {/* اتصل */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setContactIsOpen(true);
              }}
              className="flex items-center gap-1 rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white"
            >
              <Phone className="h-3 w-3" />
              <span className="text-xs md:text-sm">اتصل</span>
            </button>

            {/* الإيميل */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEmailIsOpen(true);
              }}
              className="flex items-center gap-1 rounded-md bg-main-transparent px-3 py-1.5 text-sm text-main transition hover:bg-main hover:text-white"
            >
              <MessageSquare className="h-3 w-3" />
              <span className="text-xs md:text-sm">الإيميل</span>
            </button>

            {/* واتساب */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`https://wa.me/${broker.phone.replace(/\D/g, "")}`);
              }}
              className="flex items-center gap-1 rounded-md bg-main-transparent fill-main px-3 py-1.5 text-sm text-main transition hover:bg-main hover:fill-white hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="14"
                height="14"
                viewBox="0 0 32 32"
              >
                <path
                  fillRule="evenodd"
                  d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
                ></path>
              </svg>{" "}
              <span className="text-xs md:text-sm">واتس اب</span>
            </button>
          </div>
        </div>
        <Link className="flex items-end p-3" href={"#"}>
          <Image
            className="w-[120px] object-cover"
            src={broker.agency.logo}
            alt={broker.agency.name}
            width={200}
            height={200}
          />
        </Link>
      </div>

      {/* المودالات */}
      <EmailContactForm
        isModalOpen={emailIsOpen}
        setIsModalOpen={setEmailIsOpen}
      />
      <ContactUsModal
        isOpen={contactIsOpen}
        onClose={() => setContactIsOpen(false)}
        referenceNumber="FixayX-1016"
        contactPerson={broker}
      />
    </div>
  );
};

export default BrokerCard;
