import mongoose, { Schema } from "mongoose";
import { ITacTacToe } from "../types/game.js";

const TicTacToeSchema: Schema<ITacTacToe> = new Schema({
  player1: { type: Schema.Types.ObjectId, ref: "User" },
  player2: { type: Schema.Types.ObjectId, ref: "User" },
  tiles: {
    type: [[Array]],
    default: [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ],
  },
  playerTurn: Schema.Types.ObjectId,
  winner: { type: Schema.Types.ObjectId, default: null },
  gameCode: String
});

export default mongoose.model<ITacTacToe>("TicTacToe", TicTacToeSchema);
