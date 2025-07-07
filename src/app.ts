import { errorHandler } from "./middleware/errorHandler";
import messageRoutes from "./routes/messageRoutes";
import signinRoutes from "./routes/registerRoutes"
import loginRoutes from "./routes/loginRoutes"
import registerRoutes from "./routes/registerRoutes"
import chatRoomRoutes from "./routes/chatRoomsRoutes";
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");



dotenv.config();
export const app = express();

app.use(express.json());
app.use(cors());
app.use(registerRoutes);
app.use(messageRoutes);
app.use(signinRoutes);
app.use(loginRoutes);
app.use(chatRoomRoutes);
app.use(errorHandler);
