"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoomSocket = void 0;
const registerRoomSocket = (io, socket) => {
    socket.on('joinRoom', ({ roomId, userId }) => {
        socket.join(roomId.toString());
        socket.to(roomId.toString()).emit('userJoined', { roomId, userId });
        socket.emit("userJoined", { roomId, userId });
    });
    socket.on('leaveRoom', ({ roomId, userId }) => {
        socket.leave(roomId.toString());
        socket.to(roomId.toString()).emit('userLeft', {
            userId,
            roomId
        });
        socket.emit("userLeft", { roomId, userId });
    });
};
exports.registerRoomSocket = registerRoomSocket;
