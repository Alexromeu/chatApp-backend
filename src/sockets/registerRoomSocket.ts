import { Server, Socket } from 'socket.io';


export const registerRoomSocket = (io: Server, socket: Socket) => {

  socket.on('joinRoom', ({roomId, userId}) => {
    socket.join(roomId.toString());
    socket.to(roomId.toString()).emit('userJoined', { roomId, userId });
    socket.emit("userJoined", { roomId, userId })
  });

  socket.on('leaveRoom', ({roomId, userId}) => {
    socket.leave(roomId.toString());
    socket.to(roomId.toString()).emit('userLeft', {
      userId,
      roomId
    });
    socket.emit("userLeft", { roomId, userId })
  });
};
