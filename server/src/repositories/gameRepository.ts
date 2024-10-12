import TicTacToe from "../models/TicTacToe.js";
import { ITacTacToe } from "../types/game.js";

export const findTicTacToeByGameCode = async (
  gameCode: string
): Promise<ITacTacToe | null> => {
  return await TicTacToe.findOne({ gameCode })
    .populate("player1", "userName profilePictureUrl")
    .populate("player2", "userName profilePictureUrl");
};
