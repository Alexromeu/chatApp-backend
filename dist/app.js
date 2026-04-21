"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const errorHandler_1 = require("./middleware/errorHandler");
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const chatRoomsRoutes_1 = __importDefault(require("./routes/chatRoomsRoutes"));
const getUsernameRoutes_1 = __importDefault(require("./routes/getUsernameRoutes"));
const registerSockets_1 = require("./sockets/registerSockets");
const db_1 = require("./config/db");
const getIP_1 = __importDefault(require("./utils/getIP"));
const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const localAdress = (0, getIP_1.default)();
const port = process.env.PORT;
exports.app = express();
const server = http_1.default.createServer(exports.app);
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    localAdress,
    process.env.CORS_ORIGIN
];
let credentials_needed = process.env.CORS_ORIGIN !== '*';
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: credentials_needed
    }
});
exports.app.use(express.json());
exports.app.use(cors({
    origin: allowedOrigins,
    credentials: credentials_needed
}));
exports.app.use("/api", getUsernameRoutes_1.default);
exports.app.use("/api", messageRoutes_1.default);
exports.app.use("/api", registerRoutes_1.default);
exports.app.use("/api", loginRoutes_1.default);
exports.app.use("/api", chatRoomsRoutes_1.default);
exports.app.use(errorHandler_1.errorHandler);
(0, registerSockets_1.registerAllSockets)(io);
(0, db_1.initializeDatabase)().then(() => {
    server.listen(port, () => {
        console.log(`Server running on at ${localAdress}:${port} `);
    });
}).catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});
