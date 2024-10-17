import showToast from "@/libs/utils/showToast";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const BASE = "user";

type InputType = {
  username: string;
  image: string;
  playerId: string
};
interface UserResponse {
  username: string;
  email: string;
  profilePictureUrl: string;
  playerId: string;
}

export const updateProfile = async (details: InputType) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/update-profile`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data: { message: string, user: UserResponse } = await response.json();
    toast.dismiss(toastId);
    if (data.message === "User profile updated successfully") {
      showToast("success", data.message);
      Cookies.set("user", JSON.stringify(data.user), {
        path: "/",
        expires: 1,
        sameSite: "None",
        secure: true,
      });
      // convert to jwt later
      Cookies.set("id", data.user.playerId, {
        path: "/",
        expires: 1,
        sameSite: "none",
        secure: true,
      });
      return "success";
    }
    showToast("error", data.message);
  } catch (err) {
    console.log(err);
    toast.dismiss();
    showToast("error", "Internal server error, try again later");
  }
};