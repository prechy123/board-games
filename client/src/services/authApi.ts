import { showToast } from "@/libs/utils/ShowToast";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const BASE = "auth";

type InputType = {
  email: string;
  password: string;
};

export const register = async (details: InputType) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await response.json();
    toast.dismiss(toastId);
    if (data.message === "User registered successfully") {
      showToast("success", data.message);
      return "success";
    }
    showToast("error", data.message);
  } catch (err) {
    console.log(err);
    toast.dismiss();
    showToast("error", "Internal server error, try again later");
  }
};

export const login = async (details: InputType) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data: { message: string; user: string } = await response.json();
    toast.dismiss(toastId);
    if (data.message === "User login successfully") {
      Cookies.set("user", JSON.stringify(data.user), {
        expires: 1,
        sameSite: "None",
        secure: true,
      });
      showToast("success", data.message);
      return "success";
    }
    showToast("error", data.message);
  } catch (err) {
    toast.dismiss();
    showToast("error", "Internal server error, try again later");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }
    );
    const data: { message: string } = await response.json();
    toast.dismiss(toastId);
    if (data.message === "Password reset email sent") {
      showToast("success", data.message);
      showToast(
        "success",
        "Click link provided in the mail to enter new password"
      );
      return "success";
    }
    showToast("error", data.message);
  } catch (err) {
    toast.dismiss();
    showToast("error", "Internal server error, try again later");
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    const toastId = showToast("loading", "loading...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${BASE}/reser-password?${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      }
    );
    const data: { message: string } = await response.json();
    toast.dismiss(toastId);
    if (data.message === "Password updated") {
      showToast("success", data.message);
      return "success";
    }
    showToast("error", data.message);
  } catch (err) {
    toast.dismiss();
    showToast("error", "Internal server error, try again later");
  }
};