"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as motion from "framer-motion/client";
import * as api from "@/services/authApi";
import { useRouter } from "next/navigation";

type Input = {
  email: string;
  password: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Input>();
  const handleRegistration: SubmitHandler<Input> = async (data) => {
    const status = await api.register(data);
    if (status && status === "success") router.push("/sign-in");
  };
  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email Address
          <motion.input
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="email"
            className="reg-input"
            placeholder="johndoe@gmail.com"
            {...register("email")}
          />
        </label>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
          <motion.input
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="password"
            className="reg-input"
            {...register("password")}
          />
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register
      </button>
    </form>
  );
}
