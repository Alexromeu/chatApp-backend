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
exports.getAllRooms = exports.createChatRoom = exports.getChatRooms = void 0;
const queries_1 = require("../utils/queries");
const getChatRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            res.status(400).json({ error: 'userId query parameter is required' });
            return;
        }
        const rooms = yield (0, queries_1.getChatRoomsByCreator)(userId);
        res.status(200).json(rooms);
    }
    catch (err) {
        console.error('Error fetching chat rooms:', err);
        res.status(500).json({ error: 'Failed to fetch chat rooms' });
    }
});
exports.getChatRooms = getChatRooms;
const createChatRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, creator } = req.body;
    if (!name || !creator) {
        res.status(400).json({ error: 'Room name and creator are required' });
        return;
    }
    try {
        const newRoom = yield (0, queries_1.createChatRoom)(name, creator);
        res.status(201).json(newRoom);
    }
    catch (err) {
        console.error('Error creating chat room:', err);
        res.status(500).json({ error: 'Failed to create chat room' });
    }
});
exports.createChatRoom = createChatRoom;
const getAllRooms = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield (0, queries_1.getAllChatRooms)();
        res.status(200).json(rooms);
    }
    catch (err) {
        console.error('Error fetching all chat rooms:', err);
        res.status(500).json({ error: 'Failed to fetch chat rooms' });
    }
});
exports.getAllRooms = getAllRooms;
