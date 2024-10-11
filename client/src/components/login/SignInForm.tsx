"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as motion from "framer-motion/client";
import * as api from "@/services/authApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import showToast from "@/libs/utils/showToast";
import { isAuth } from "@/redux/reducers/authSlice";

type Input = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm<Input>();
  const handleLogIn: SubmitHandler<Input> = async (data) => {
    const status = await api.login(data);
    if (status && status === "success") {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        showToast("info", "User Connected");
        dispatch(
          isAuth({
            isAuthenticated: true,
            email: parsedUser.email,
            profilePictureUrl: parsedUser.profilePictureUrl,
            username: parsedUser.username,
            playerId: parsedUser.playerId,
          })
        );
      }
      router.push("/");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogIn)}>
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
      <motion.button
        type="submit"
        className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 "
        whileTap={{ scale: 0.9 }}
      >
        Log in
      </motion.button>
    </form>
  );
}
