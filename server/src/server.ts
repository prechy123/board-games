import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import ChatNameSpace from "./sockets/chat.js";
import mongoose from "mongoose";

const corsOption = {
  origin: ["http://localhost:3000", "https://board-games-two.vercel.app"],
  methods: "*",
  credentials: true,
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOption));

// routes
app.use("/auth", authRouter);

// sockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOption,
});
// Socket IO name spaces
ChatNameSpace(io);

// default route
app.get("/", (req: Request, res: Response) => {
  res.send("How did you get here");
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT;
    server.listen(PORT, () => {
      console.log(`connected to db & Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) =>{
    console.log(error)
  })



