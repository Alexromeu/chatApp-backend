import { Server, Socket } from 'socket.io';

const onlineUsers = new Map<string, string>(); 

export const registerPresenceSocket = (io: Server, socket: Socket) => {
  
  socket.on('userOnline', (senderId: string) => {
    onlineUsers.set(socket.id, senderId);

    console.log(`🟢 ${senderId} connected`);

    const roomId = Array.from(socket.rooms).find((id) => id !== socket.id); 
    const usersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId!) || [])
      .map(socketId => onlineUsers.get(socketId))
      .filter(Boolean);

  
    io.to(roomId!).emit('onlineUsers', { roomId, users: usersInRoom });
    socket.emit("userOnline", senderId)
  });

  socket.on('typing', ({ roomId, senderId }) => {
    io.emit('typing', { roomId, senderId });
    socket.emit('typing', { roomId, senderId })
  });

  socket.on('stopTyping', ({ roomId, senderId }) => {
    socket.emit('stopTyping', { roomId, senderId });
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
};

