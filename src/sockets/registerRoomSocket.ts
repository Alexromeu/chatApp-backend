import { Server, Socket } from 'socket.io';

export const registerRoomSocket = (io: Server, socket: Socket) => {

  socket.on('joinRoom', (roomId: number) => {
    socket.join(roomId.toString());
    socket.to(roomId.toString()).emit('userJoined', {
      userId: socket.id,
      roomId,
    });
    
    console.log(` ${socket.id} joined room ${roomId}`);
  });

  socket.on('leaveRoom', (roomId: number) => {
    socket.leave(roomId.toString());
    console.log(`so it u ${socket.id} left room ${roomId}`);

    socket.to(roomId.toString()).emit('userLeft', {
      userId: socket.id,
      roomId,
    });
  });
};
