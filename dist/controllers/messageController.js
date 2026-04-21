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
exports.getMessages = void 0;
const queries_1 = require("../utils/queries");
const uuid_1 = require("uuid");
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userId } = req.query;
    try {
        let messages;
        if (roomId && typeof roomId === "string" && (0, uuid_1.validate)(roomId)) {
            messages = yield (0, queries_1.getMessagesByRoomId)(roomId);
        }
        else if (userId && typeof userId === "string" && (0, uuid_1.validate)(userId)) {
            messages = yield (0, queries_1.getMessagesByUserId)(userId);
        }
        else {
            res.status(400).json({ error: "roomId or userId query parameter is required" });
            return;
        }
        res.json(messages);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch messages", err });
    }
});
exports.getMessages = getMessages;
