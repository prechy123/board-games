import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import gameRouter from "./routes/game.js";
import ChatNameSpace from "./sockets/chat.js";
import mongoose from "mongoose";
import { TicTacToeNameSpace } from "./sockets/game.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const corsOption = {
  origin: process.env.BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOption));

// routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/game", gameRouter);

// sockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOption,
});
// Socket IO name spaces
TicTacToeNameSpace(io);
ChatNameSpace(io);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("How did you get here");
});

const PORT = process.env.PORT || 3000;
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `connected to db & Server is running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });
