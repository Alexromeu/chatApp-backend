import { Server, Socket } from "socket.io";
import { Message } from "../models"


export const registerChatSocket = (io: Server, socket: Socket) => {
  
    socket.on("chatMessage", async ({ senderId, roomId, content, timestamp, sendername }) => {
      try {
        console.log("creating new message in database", senderId, roomId, content, timestamp, sendername)

        const message = await Message.create({
          senderId,
          roomId,
          content,
          timestamp,
          sendername
        });
        

        io.to(roomId).emit("chatMessage", message)
      } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          socket.emit("error", { message: errorMessage });
    }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

}
