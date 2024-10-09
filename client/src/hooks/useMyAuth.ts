"use client";

import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { isAuth } from "@/redux/reducers/authSlice";
import { useRouter } from "next/navigation";
import showToast from "@/libs/utils/showToast";

export default function useMyAuth() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
      showToast("info", "User Connected")
    } else {
      route.push("/sign-in");
      showToast("info", "Sign in to continue")
    }
  }, []);
  if (user) {
    dispatch(
      isAuth({
        isAuthenticated: true,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl,
        username: user.username,
        playerId: user.playerId,
      })
    );
  }
}
