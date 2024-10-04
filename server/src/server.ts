import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ChatNameSpace from "./sockets/chat.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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
