import User from "../models/User.js";
import { IUser, IUserProfile } from "../types/user.js";
import crypto from "crypto";

export const findByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const findByResetToken = async (
  token: string
): Promise<IUser | null> => {
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
};

export const findById = async (id: string): Promise<IUserProfile> => {
  return await User.findById(id).select("email userName profilePictureUrl")
}

export const createUser = async (
  email: string,
  password: string,
  userName: string
): Promise<IUser> => {
  const newUser = new User({ email, password, userName });
  return await newUser.save();
};

export const resetToken = async (user: IUser, resetToken: string): Promise<IUser> => {
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  return await user.save();
};

export const setNewPassword = async (user: IUser, password: string): Promise<IUser> => {
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  return await user.save();
};

