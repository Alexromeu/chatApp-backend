import { Server } from "socket.io";

import { Message } from "../models"


export const registerChatSocket = (io: Server) => {

  io.on("connection", socket => {
    console.log("User connected:", socket.data.userId);

    socket.on("chatMessage", async ({ chatRoomId, userId, content }) => {
      
      try {
        const message = await Message.create({
          chatRoomId: chatRoomId,
          userId: userId,
          content: content
        });

        io.to(chatRoomId).emit("chatMessage", {
          message//testing response
      })
      } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          socket.emit("error", { message: errorMessage });
    }

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
