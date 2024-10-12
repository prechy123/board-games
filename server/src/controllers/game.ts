import { Response, Request } from "express";
import * as GameService from "../services/gameService.js"

export const getTicTacToeGame = async (req: Request, res: Response): Promise<void> => {
  const { gameCode } = req.params;
  try {
    const game = await GameService.findTicTacToeGame(gameCode)
    if (!game) {
      res.status(400).json({ message: "Game not found" });
      return;
    }
    res.status(200).json({ game });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
