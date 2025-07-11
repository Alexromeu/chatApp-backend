import { Server, Socket } from 'socket.io';


export const registerRoomSocket = (io: Server, socket: Socket) => {

  socket.on('joinRoom', (roomId: string, userId: string) => {
    socket.join(roomId.toString());
    socket.to(roomId.toString()).emit('userJoined', { userId, roomId });
    socket.emit("userJoined", { roomId, userId })
    console.log(` ${socket.id} joined room ${roomId}`);
  });

  socket.on('leaveRoom', (roomId: number, userId: string) => {
    socket.leave(roomId.toString());
    console.log(`so it u ${socket.id} left room ${roomId}`);

    socket.to(roomId.toString()).emit('userLeft', {
      userId,
      roomId
    });
    socket.emit("userLeft", { roomId, userId })
  });
};
