import { registerChatSocket } from "./registerChatSocket";
import { Server, Socket } from "socket.io";
import { registerRoomSocket } from "./registerRoomSocket"
import { registerPresenceSocket } from "./registerPresenceSocket"



export const registerAllSockets = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    registerChatSocket(io, socket);
    registerRoomSocket(io, socket);
    registerPresenceSocket(io, socket);
  });
};
