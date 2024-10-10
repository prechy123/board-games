"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { isAuth } from "@/redux/reducers/authSlice";
import { useRouter } from "next/navigation";
import showToast from "@/libs/utils/showToast";

export default function useMyAuth() {
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
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
    } else {
      route.push("/sign-in");
      showToast("info", "Sign in to continue");
    }
  }, [dispatch, route]);
}
