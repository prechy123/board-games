import { Router } from "express";
import * as gameController from "../controllers/game.js";

const router = Router();

router.get("/tic-tac-toe/find/:gameCode", gameController.getTicTacToeGame);

export default router;
