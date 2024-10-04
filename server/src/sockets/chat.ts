import { Server } from "socket.io";

function ChatNameSpace(io: Server) {
  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", (socket) => {
    console.log("A user connected to chat");
    socket.on("sendMessage", (data) => {
      console.log("User  sent a message");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from chat");
    });
  });
}

export default ChatNameSpace;
