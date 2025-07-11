import { Server, Socket } from 'socket.io';

const onlineUsers = new Map<string, string>(); 

export const registerPresenceSocket = (io: Server, socket: Socket) => {
  
  socket.on('userOnline', (senderId: string) => {
    onlineUsers.set(socket.id, senderId);

    console.log(`🟢 ${senderId} connected`);

    io.emit('onlineUsers', Array.from(onlineUsers.values()));
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
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
};

