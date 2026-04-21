"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPresenceSocket = void 0;
const onlineUsers = new Map();
const registerPresenceSocket = (io, socket) => {
    socket.on('userOnline', (senderId) => {
        onlineUsers.set(socket.id, senderId);
        const roomId = Array.from(socket.rooms).find((id) => id !== socket.id);
        const usersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
            .map(socketId => onlineUsers.get(socketId))
            .filter(Boolean);
        io.to(roomId).emit('onlineUsers', { roomId, users: usersInRoom });
        socket.emit("userOnline", senderId);
    });
    socket.on('typing', ({ roomId, senderId }) => {
        socket.to(roomId.toString()).emit('typing', { roomId, senderId });
    });
    socket.on('stopTyping', ({ roomId, senderId }) => {
        socket.to(roomId.toString()).emit('stopTyping', { roomId, senderId });
    });
    socket.on('disconnecting', () => {
        const rooms = Array.from(socket.rooms).filter((id) => id !== socket.id);
        onlineUsers.delete(socket.id);
        for (const roomId of rooms) {
            const usersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
                .filter((id) => id !== socket.id)
                .map((socketId) => onlineUsers.get(socketId))
                .filter(Boolean);
            io.to(roomId).emit('onlineUsers', { roomId, users: usersInRoom });
        }
    });
};
exports.registerPresenceSocket = registerPresenceSocket;
