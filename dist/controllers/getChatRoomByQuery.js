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
exports.getChatRoomByQuery = void 0;
const queries_1 = require("../utils/queries");
const getChatRoomByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.query;
    if (!roomId || typeof roomId !== 'string') {
        res.status(400).json({ error: 'roomId query parameter is required and must be a string' });
        return;
    }
    try {
        const room = yield (0, queries_1.getChatRoomById)(roomId);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }
        res.status(200).json(room);
    }
    catch (err) {
        console.error('Error fetching room by ID:', err);
        res.status(500).json({ error: 'Failed to fetch room' });
    }
});
exports.getChatRoomByQuery = getChatRoomByQuery;
