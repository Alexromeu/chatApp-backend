"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication token missing'));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof payload === 'object' && 'userId' in payload) {
            socket.data.userId = payload.userId;
            next();
        }
        else {
            next(new Error('Invalid token payload'));
        }
    }
    catch (error) {
        next(new Error('Authentication failed'));
    }
};
exports.socketAuthMiddleware = socketAuthMiddleware;
