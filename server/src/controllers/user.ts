import { Response, Request } from "express";
import * as UserService from "../services/userService.js"

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { username, image, playerId } = req.body;
  // const playerId = req.cookies.id;
  
  try {
    const user = await UserService.updateProfile(username, image, playerId)
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    res.status(201).json({ message: "User profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
