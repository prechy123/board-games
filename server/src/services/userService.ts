import { Types } from "mongoose";
import * as userRepository from "../repositories/userRepository.js";
import uploadImageToCloudinary from "../utils/uploadToCloudinary.js";

export const updateProfile = async (
  username: string,
  image: string,
  playerId: string
) => {
  const user = await userRepository.findById(playerId);
  if (!user) {
    return null;
  }
  let url = "";
  if (image) {
    url = await uploadImageToCloudinary(image);
  }
  user.userName = username ? username : user.userName;
  user.profilePictureUrl = image ? url : user.profilePictureUrl;
  await user.save();
  const userData = {
    username: user.userName,
    email: user.email,
    profilePictureUrl: user.profilePictureUrl,
    playerId: user._id,
  };
  return userData;
};
