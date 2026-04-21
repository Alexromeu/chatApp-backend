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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessagesByRoomId = exports.deleteMessage = exports.getAllMessages = exports.getMessagesByUserId = exports.getMessagesByRoomId = exports.createMessage = exports.deleteChatRoom = exports.filterChatRoomByName = exports.getChatRoomsByCreator = exports.getAllChatRooms = exports.getChatRoomById = exports.createChatRoom = exports.getAllUsers = exports.updateUserStatus = exports.getUsernameById = exports.getUserById = exports.getUserByUsername = exports.createUser = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
// ============ USER QUERIES ============
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const result = yield (0, db_1.query)(`INSERT INTO "Users" (id, username, password, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, status, "createdAt"`, [id, username, hashedPassword, 'offline']);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "Users" WHERE username = $1`, [username]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserByUsername = getUserByUsername;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT id, username, status, "avatarUrl", "createdAt", "updatedAt" FROM "Users" WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserById = getUserById;
const getUsernameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, db_1.query)(`SELECT username FROM "Users" WHERE id = $1`, [id]);
        return ((_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.username) || null;
    }
    catch (error) {
        throw error;
    }
});
exports.getUsernameById = getUsernameById;
const updateUserStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`UPDATE "Users" SET status = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`, [status, id]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.updateUserStatus = updateUserStatus;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT id, username, status, "avatarUrl", "createdAt" FROM "Users"`);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
// ============ CHAT ROOM QUERIES ============
const createChatRoom = (name, creator) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const result = yield (0, db_1.query)(`INSERT INTO "ChatRooms" (id, name, creator) 
       VALUES ($1, $2, $3) 
       RETURNING *`, [id, name, creator]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createChatRoom = createChatRoom;
const getChatRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "ChatRooms" WHERE id = $1`, [id]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.getChatRoomById = getChatRoomById;
const getAllChatRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "ChatRooms" ORDER BY "createdAt" DESC`);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllChatRooms = getAllChatRooms;
const getChatRoomsByCreator = (creator) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "ChatRooms" WHERE creator = $1 ORDER BY "createdAt" DESC`, [creator]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getChatRoomsByCreator = getChatRoomsByCreator;
const filterChatRoomByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "ChatRooms" WHERE LOWER(name) LIKE LOWER($1) ORDER BY "createdAt" DESC`, [`%${name}%`]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.filterChatRoomByName = filterChatRoomByName;
const deleteChatRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`DELETE FROM "ChatRooms" WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteChatRoom = deleteChatRoom;
// ============ MESSAGE QUERIES ============
const createMessage = (senderId, roomId, content, sendername, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const messageTimestamp = timestamp || Date.now();
        const result = yield (0, db_1.query)(`INSERT INTO "Messages" (id, "senderId", "roomId", content, sendername, timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`, [id, senderId, roomId, content, sendername, messageTimestamp]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
});
exports.createMessage = createMessage;
const getMessagesByRoomId = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "Messages" WHERE "roomId" = $1 ORDER BY "createdAt" ASC`, [roomId]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getMessagesByRoomId = getMessagesByRoomId;
const getMessagesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT * FROM "Messages" WHERE "senderId" = $1 ORDER BY "createdAt" DESC`, [userId]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getMessagesByUserId = getMessagesByUserId;
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`SELECT m.*, u.username FROM "Messages" m 
       LEFT JOIN "Users" u ON m."senderId" = u.id 
       ORDER BY m."createdAt" ASC`);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllMessages = getAllMessages;
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`DELETE FROM "Messages" WHERE id = $1 RETURNING *`, [id]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteMessage = deleteMessage;
const deleteMessagesByRoomId = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)(`DELETE FROM "Messages" WHERE "roomId" = $1`, [roomId]);
        return result.rowCount || 0;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteMessagesByRoomId = deleteMessagesByRoomId;
