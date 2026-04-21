import http from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middleware/errorHandler";
import messageRoutes from "./routes/messageRoutes";
import signinRoutes from "./routes/registerRoutes"
import loginRoutes from "./routes/loginRoutes"
import chatRoomRoutes from "./routes/chatRoomsRoutes";
import getUsernameRoutes from "./routes/getUsernameRoutes";
import { registerAllSockets } from "./sockets/registerSockets";
import { initializeDatabase } from "./config/db";
import getLocalIP from "./utils/getIP"
const path = require("path");
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
dotenv.config();

const localAdress = getLocalIP()
const port = process.env.PORT;
export const app = express();
const server = http.createServer(app);

const allowedOrigins = 
  process.env.CORS_ORIGIN

let credentials_needed = process.env.CORS_ORIGIN !== '*';

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: credentials_needed
  }
});

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: credentials_needed
}));


app.use("/api", getUsernameRoutes);
app.use("/api", messageRoutes);
app.use("/api", signinRoutes);
app.use("/api", loginRoutes);
app.use("/api", chatRoomRoutes);
app.use(errorHandler);
registerAllSockets(io);

initializeDatabase().then(() => {
  server.listen(port, () => {
    console.log(`Server running on at ${port} `);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
