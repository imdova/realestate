import { Phone, Mail } from "lucide-react";
import { EmployerCompany } from "@/types/real-estate";
import DynamicModal from "../DynamicModal";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceNumber: string;
  contactPerson: EmployerCompany;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
  referenceNumber,
  contactPerson,
}) => {
  const formattedPhone = contactPerson.phone.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1-$2-$3",
  );

  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      title="اتصل بنا"
      size="md"
      showCloseButton={true}
    >
      <div className="p-6">
        {/* Company Info */}
        <div className="mb-6">
          <h4 className="mx-auto mb-3 w-fit font-medium text-gray-800">
            {contactPerson.company}
          </h4>

          {/* Contact Person */}
          <div className="mb-4 flex items-center gap-3 p-3">
            وكيل العقار:
            <span className="text-gray-700">{contactPerson.name}</span>
          </div>

          {/* Contact Methods */}
          <div className="space-y-3">
            {/* Phone */}
            <a
              href={`tel:${contactPerson.phone}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-blue-50"
            >
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">{formattedPhone}</span>
            </a>

            {/* Email */}
            {contactPerson.email && (
              <a
                href={`mailto:${contactPerson.email}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-red-50"
              >
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">{contactPerson.email}</span>
              </a>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-lg bg-yellow-50 p-3 text-sm text-gray-500">
          <p>يرجى ذكر الرقم المرجعي عند الاتصال: {referenceNumber}</p>
        </div>
      </div>
    </DynamicModal>
  );
};

export default ContactUsModal;
