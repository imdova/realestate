import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DynamicModal from "../UI/DynamicModal";
import PhoneInput from "../UI/fileds/PhoneInput";

type FormData = {
  name: string;
  email: string;
  phone: string;
  phone_code: string;
  message: string;
};

const EmailContactForm = ({
  isModalOpen = false,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (x: boolean) => void;
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FormData>({
    defaultValues: {
      message:
        "مرحباً، أرغب بالاستفسار عن عقارك رقم: بيوت - 1016-FjxayX. أرجو منك الاتصال بي في أقرب وقت ممكن.",
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would call your API here
      // await sendEmail(data);
      console.log(data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <>
      <DynamicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="تواصل معنا"
        size="md"
      >
        {isSuccess ? (
          <div dir="rtl" className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              تم إرسال الرسالة بنجاح
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              سنقوم بالرد عليك في أقرب وقت ممكن.
            </p>
            <div className="mt-5">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={closeModal}
              >
                حسناً
              </button>
            </div>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-right text-sm font-medium text-gray-700"
                >
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "الاسم مطلوب" })}
                  className={`mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm outline-none sm:text-sm ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  dir="rtl"
                />
                {errors.name && (
                  <p className="mt-1 text-right text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-right text-sm font-medium text-gray-700"
                >
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "بريد إلكتروني غير صالح",
                    },
                  })}
                  className={`mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm outline-none sm:text-sm ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  dir="rtl"
                />
                {errors.email && (
                  <p className="mt-1 text-right text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Input with Country Code */}
              <div>
                <PhoneInput name="phone" required />
                <input type="hidden" {...methods.register("phone_code")} />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-right text-sm font-medium text-gray-700"
                >
                  الرسالة
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="اكتب رسالتك هنا..."
                  {...register("message", { required: "الرسالة مطلوبة" })}
                  className={`mt-1 block w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm outline-none sm:text-sm ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  dir="rtl"
                />
                {errors.message && (
                  <p className="mt-1 text-right text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex justify-start pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex justify-center rounded-md border border-transparent bg-main px-4 py-2 text-sm font-medium text-white hover:bg-main-dark focus:outline-none ${
                    isLoading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    "إرسال الرسالة"
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </DynamicModal>
    </>
  );
};

export default EmailContactForm;
