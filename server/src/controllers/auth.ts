import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const emailToFind = email.toLowerCase();
  try {
    const result = await authService.register(emailToFind, password);
    if ("error" in result) {
      res.status(400).json({ message: result.error });
      return;
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const emailToFind = email.toLowerCase();
    const user = await authService.login(emailToFind, password);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({ message: "User login successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await authService.profile(id);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({ profile: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const emailToFind = email.toLowerCase();
  try {
    const message = await authService.forgotPassword(emailToFind);
    if (!message) {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }
    res.status(200).json({ message });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const result = await authService.resetPassword(token, password);
    if (!result) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
