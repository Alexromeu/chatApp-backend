import { Server, Socket } from 'socket.io';

const onlineUsers = new Map<string, string>(); 

export const registerPresenceSocket = (io: Server, socket: Socket) => {
  
  socket.on('userOnline', (userId: string) => {
    onlineUsers.set(socket.id, userId);
    console.log(`🟢 ${userId} connected`);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });

  socket.on('typing', ({ roomId, userId }) => {
    console.log("typing...")
    io.emit('typing', { roomId, userId });
    socket.emit('typing', { roomId, userId })
  });

  socket.on('stopTyping', ({ roomId, userId }) => {
    socket.to(roomId.toString()).emit('stopTyping', { roomId, userId });
  });

  socket.on('disconnect', () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    console.log(`🔴 ${userId} disconnected`);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
};

