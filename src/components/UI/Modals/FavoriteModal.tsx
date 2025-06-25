import { useState } from "react";
import DynamicModal from "../DynamicModal";
import { Heart } from "lucide-react";

const FavoriteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-800 hover:text-main"
      >
        <Heart size={14} />{" "}
        <span className="hidden md:block">الإعلانات المفضلة</span>{" "}
        <span className="text-[12px]">(4)</span>
      </button>

      <DynamicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="الإعلانات المفضلة "
      >
        <div className="p-4">
          <h3 className="text-lg font-medium">المحتوى هنا</h3>
          <p className="mt-2">يمكنك وضع أي محتوى تريده داخل المودال</p>
        </div>
      </DynamicModal>
    </div>
  );
};

export default FavoriteModal;
