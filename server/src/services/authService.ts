import * as userRepository from "../repositories/userRepository.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const register = async (email: string, password: string) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    return { error: "User already exists" };
  }

  const userName = email.split("@")[0];
  const newUser = await userRepository.createUser(email, password, userName);
  return newUser;
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }
  const userData = {
    username: user.userName,
    email: user.email,
    profilePictureUrl: user.profilePictureUrl
  }
  
  return userData;
};

export const forgotPassword = async (email: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) return null;

  const resetToken = crypto.randomBytes(20).toString("hex");
  await userRepository.resetToken(user, resetToken);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Password Reset",
    text: `Click the link to reset your password: ${process.env.BASE_URL}/reset-password/${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
  return "Password reset email sent";
};

export const resetPassword = async (token: string, password: string) => {
  const user = await userRepository.findByResetToken(token);
  if (!user) return null;

  await userRepository.setNewPassword(user, password);

  return true;
};
