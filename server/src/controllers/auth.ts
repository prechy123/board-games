import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await authService.register(email, password);
    if ("error" in result) {
      res.status(400).json({ message: result.error });
      return;
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (!token) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({ message: "User login successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  try {
    const message = await authService.forgotPassword(email);
    if (!message) {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }
    res.status(200).json({ message });
  } catch (error) {
    const err = error as Error
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
    res.status(500).json({ message: "Server error" });
  }
};
