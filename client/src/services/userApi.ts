import showToast from "@/libs/utils/showToast";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const BASE = "user";

type InputType = {
  username: string;
  image: string;
};

export const updateProfile = async (details: InputType) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/update-profile`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data: { message: string, user: string } = await response.json();
    toast.dismiss(toastId);
    if (data.message === "User profile updated successfully") {
      showToast("success", data.message);
      Cookies.set("user", JSON.stringify(data.user), {
        expires: 1,
        sameSite: "None",
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