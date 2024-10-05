import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import authRouter from "./routes/auth.js";
import ChatNameSpace from "./sockets/chat.js";

dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://board-games-two.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  })
);
app.use("/auth", authRouter);



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://board-games-two.vercel.app"],
    methods: ["GET", "POST"],
  },
});
// Socket IO name spaces
ChatNameSpace(io);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World! Its me Za Worldoo");
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
