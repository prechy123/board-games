import User from "../models/User.js";
import { IUser } from "../types/user.js";

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

export const createUser = async (
  email: string,
  password: string,
  userName: string
): Promise<IUser> => {
  const newUser = new User({ email, password, userName });
  return await newUser.save();
};
