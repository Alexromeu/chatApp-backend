import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socketAuth";


export const registerChatSocket = (io: Server) => {
  io.use(socketAuthMiddleware);

  io.on("connection", socket => {
    console.log("User connected:", socket.data.userId);

    socket.on("message", data => {
      socket.emit("message", data); // broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.data.userId);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room.id);
      socket.to(room.id).emit("userJoined", socket.data.userId);
    });

    socket.on("chatMessage", ({ room, content }) => {
      io.to(room.id).emit("chatMessage", { content, sender: socket.data.userId});
    })

  })
}
