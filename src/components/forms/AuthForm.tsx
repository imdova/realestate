import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";

type AuthFormData = {
  name?: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  onSuccess?: () => void;
  onClose?: () => void;
  show: boolean;
};

export const AuthForm = ({ onSuccess, onClose, show }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSocialLoading, setIsSocialLoading] = useState<
    "google" | "facebook" | null
  >(null);
  const [isRegister, setIsRegister] = useState(false);

  const { register, handleSubmit, reset } = useForm<AuthFormData>();

  useEffect(() => {
    reset();
    setAuthError("");
  }, [isRegister, reset]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setAuthError("");

    // Manual validation
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      setAuthError("البريد الإلكتروني غير صحيح");
      setIsLoading(false);
      return;
    }

    if (!data.password || data.password.length < 6) {
      setAuthError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setIsLoading(false);
      return;
    }

    if (isRegister && (!data.name || data.name.length < 2)) {
      setAuthError("الاسم يجب أن يكون حرفين على الأقل");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        onSuccess?.();
      } else {
        setAuthError("بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setAuthError("فشل في المصادقة");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsSocialLoading(provider);
    setAuthError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Simulated sign in with ${provider}`);
    } catch (error) {
      console.log(error);
      setAuthError("فشل تسجيل الدخول عبر وسائل التواصل");
    } finally {
      setIsSocialLoading(null);
    }
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative mx-4 w-full max-w-md rounded-2xl bg-white shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute left-4 top-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              ✕
            </button>

            <div className="px-8 py-10">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 text-center text-3xl font-bold text-gray-800"
              >
                {isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
              </motion.h2>

              {authError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 rounded-lg bg-red-50 p-3 text-center text-red-600"
                >
                  {authError}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="name"
                      className="mb-1 block text-right text-sm font-medium text-gray-700"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-gray-700 placeholder-gray-400 transition-all focus:outline-none focus:ring-blue-500/20"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isRegister ? 0.3 : 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="mb-1 block text-right text-sm font-medium text-gray-700"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-gray-700 placeholder-gray-400 transition-all focus:outline-none focus:ring-blue-500/20"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isRegister ? 0.4 : 0.3 }}
                >
                  <label
                    htmlFor="password"
                    className="mb-1 block text-right text-sm font-medium text-gray-700"
                  >
                    كلمة المرور
                  </label>
                  <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-right text-gray-700 placeholder-gray-400 transition-all focus:outline-none focus:ring-blue-500/20"
                    placeholder="أدخل كلمة المرور"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-main to-main-dark px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-main-dark hover:to-main focus:outline-none disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="ml-2">جاري المعالجة...</span>
                      <span className="animate-spin">↻</span>
                    </>
                  ) : isRegister ? (
                    "إنشاء حساب"
                  ) : (
                    "تسجيل الدخول"
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">أو</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialLogin("google")}
                    disabled={!!isSocialLoading}
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-blue-500/20 disabled:opacity-70"
                  >
                    {isSocialLoading === "google" ? (
                      <span className="animate-spin">↻</span>
                    ) : (
                      <>
                        <span className="ml-2">جوجل</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#fbc02d"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                          <path
                            fill="#e53935"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          ></path>
                          <path
                            fill="#4caf50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          ></path>
                          <path
                            fill="#1565c0"
                            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                        </svg>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSocialLogin("facebook")}
                    disabled={!!isSocialLoading}
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-blue-500/20 disabled:opacity-70"
                  >
                    {isSocialLoading === "facebook" ? (
                      <span className="animate-spin">↻</span>
                    ) : (
                      <>
                        <span className="ml-2">فيسبوك</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center text-sm text-gray-500"
              >
                <button
                  onClick={toggleRegister}
                  className="font-medium text-main hover:text-main-dark"
                >
                  {isRegister
                    ? "لديك حساب بالفعل؟ سجل الدخول"
                    : "ليس لديك حساب؟ إنشاء حساب"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
