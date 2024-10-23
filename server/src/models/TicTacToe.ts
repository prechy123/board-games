import mongoose, { Schema } from "mongoose";
import { ITacTacToe } from "../types/game.js";

const TicTacToeSchema: Schema<ITacTacToe> = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: "User" },
  player2: { type: Schema.Types.ObjectId, ref: "User" },
  tiles: {
    type: [[String]],
    default: () => [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ],
  },
  playerTurn: Schema.Types.ObjectId,
  winner: { type: Schema.Types.ObjectId, default: null },
  gameCode: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600
  }
});

export default mongoose.model<ITacTacToe>("TicTacToe", TicTacToeSchema);
