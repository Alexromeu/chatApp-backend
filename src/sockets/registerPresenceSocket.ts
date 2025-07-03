import { Server, Socket } from 'socket.io';

const onlineUsers = new Map<string, string>(); 

export const registerPresenceSocket = (io: Server, socket: Socket) => {
  
  socket.on('userOnline', (userId: string) => {
    onlineUsers.set(socket.id, userId);
    console.log(`🟢 ${userId} connected`);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });

  socket.on('typing', ({ roomId, userId }) => {
    socket.to(roomId.toString()).emit('userTyping', userId);
  });

  socket.on('stopTyping', ({ roomId, userId }) => {
    socket.to(roomId.toString()).emit('userStoppedTyping', userId);
  });

  socket.on('disconnect', () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    console.log(`🔴 ${userId} disconnected`);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
};
