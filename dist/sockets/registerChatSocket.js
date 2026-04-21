"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatSocket = void 0;
const queries_1 = require("../utils/queries");
const registerChatSocket = (io, socket) => {
    socket.on("chatMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ senderId, roomId, content, timestamp, sendername }) {
        try {
            console.log("creating new message in database", senderId, roomId, content, timestamp, sendername);
            const message = yield (0, queries_1.createMessage)(senderId, roomId, content, sendername, timestamp);
            io.to(roomId).emit("chatMessage", message);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            socket.emit("error", { message: errorMessage });
        }
    }));
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
};
exports.registerChatSocket = registerChatSocket;
