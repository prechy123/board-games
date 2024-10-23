import { Document } from "mongoose";
import { ObjectId, Schema } from "mongoose";

export interface ITacTacToe extends Document {
  player1: Types.ObjectId;
  player2: Types.ObjectId;
  tiles: string[][];
  playerTurn: Types.ObjectId;
  winner: Types.ObjectId | null;
  gameCode: string;
  createdAt: Date
}
