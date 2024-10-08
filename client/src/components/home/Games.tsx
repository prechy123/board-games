"use client";

import { isAuth } from "@/redux/reducers/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { IUser } from "@/types/user";

export function Games() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  if (user) {
    dispatch(
      isAuth({
        isAuthenticated: true,
        email: user.email,
        profilePictureUrl: user.profilePictureUrl,
        username: user.username,
        playerId: user.playerId
      })
    );
  }
  return (
    <div>
      <Link href="/tic-tac-toe">Tic Tac Toe</Link>
    </div>
  );
}
