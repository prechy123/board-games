"use client";

import { RootState } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as motion from "framer-motion/client";
import imageToDataUrlConverter from "@/libs/utils/imageToDataUrlConverter";
import * as api from "@/services/userApi"
import { useRouter } from "next/navigation";

export default function ProfileDetails() {
    const router = useRouter()
  const { username, profilePictureUrl, email, playerId } = useSelector(
    (state: RootState) => state.auth
  );
  const [newUserName, setNewUserName] = useState("");
  const [newPictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    setNewUserName(username);
    setPictureUrl(profilePictureUrl);
  }, [username, profilePictureUrl]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;

    const dataUrl = await imageToDataUrlConverter(file[0]);
    if (!dataUrl) return;
    setPictureUrl(dataUrl);
  };
  const handleSubmit = async () => {
    const response = await api.updateProfile({username: newUserName, image: newPictureUrl, playerId});
    if (response === "success") router.refresh()
  }

  return (
    <div className=" text-left relative">
      <p className=" mb-3">
        <span className=" font-bold text-xl">Username:</span>
        <motion.input
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="text"
          className="reg-input"
          placeholder="johndoe"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </p>
      <p className=" mb-3">
        <span className=" font-bold text-xl">Email Address:</span> {email}
      </p>
      <div className=" flex flex-col mb-2">
        <p>
          <span className=" font-bold text-xl">Profile Picture:</span>{" "}
        </p>
        <label className=" self-center mb-2 text-sm font-medium text-gray-900 dark:text-white cursor-pointer relative">
          <Image
            src={newPictureUrl}
            width={100}
            height={100}
            alt="New Profile Picture"
            className=" rounded-full self-center"
          />
          <input
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className=" absolute top-0 right-0">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </label>
        <div className=" flex justify-end">
          <motion.button
            onClick={handleSubmit}
            className="text-white bg-blue-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600"
            whileTap={{ scale: 0.9 }}
          >
            Update
          </motion.button>
        </div>
      </div>
    </div>
  );
}
