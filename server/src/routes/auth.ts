import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User, { IUser } from "../models/User.js";

const router = Router();

// Register route
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot password route
router.post(
  "/forgot-password",
  async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User does not exist" });
        return;
      }

      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
      await user.save();

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
        text: `You are receiving this because you requested a password reset.\n\n
            Click the link to reset your password:\n\n
            http://localhost:3000/reset-password/${resetToken}\n\n
            If you didn't request this, ignore this email.`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err)
          return res.status(500).json({ message: "Failed to send email" });
        res.status(200).json({ message: "Password reset email sent" });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Reset password route
router.post(
  "/reset-password/:token",
  async (req: Request, res: Response): Promise<void> => {
    const { password } = req.body;

    try {
      const user: IUser | null = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        res.status(400).json({ message: "Invalid or expired token" });
        return;
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.status(200).json({ message: "Password updated" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
