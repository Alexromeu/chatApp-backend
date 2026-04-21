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
exports.filterChatroomByName = void 0;
const queries_1 = require("../utils/queries");
const filterChatroomByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    if (!name || typeof name !== "string") {
        res.status(400).json({ error: "Missing or invalid room name" });
        return;
    }
    try {
        const rooms = yield (0, queries_1.filterChatRoomByName)(name.trim());
        res.json(rooms);
    }
    catch (err) {
        console.error("Error fetching rooms:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.filterChatroomByName = filterChatroomByName;
