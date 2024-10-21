import { Server, Socket } from "socket.io";

interface MessageData {
  message: string;
  sender: string;
  gameCode: string;
}

function ChatNameSpace(io: Server) {
  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", (socket: Socket) => {
    console.log("A user connected to chat");
    socket.on("sendMessage", (data: MessageData) => {
      const { message, sender, gameCode } = data;
      socket.to(gameCode).emit("newMessage", { sender, message });
      console.log("User  sent a message");
    });
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("joined room");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from chat");
    });
  });
}

export default ChatNameSpace;
