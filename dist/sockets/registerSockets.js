"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllSockets = void 0;
const registerChatSocket_1 = require("./registerChatSocket");
const registerRoomSocket_1 = require("./registerRoomSocket");
const registerPresenceSocket_1 = require("./registerPresenceSocket");
const socketAuth_1 = require("../middleware/socketAuth");
const registerAllSockets = (io) => {
    io.use(socketAuth_1.socketAuthMiddleware);
    io.on('connection', (socket) => {
        (0, registerChatSocket_1.registerChatSocket)(io, socket);
        (0, registerRoomSocket_1.registerRoomSocket)(io, socket);
        (0, registerPresenceSocket_1.registerPresenceSocket)(io, socket);
    });
};
exports.registerAllSockets = registerAllSockets;
