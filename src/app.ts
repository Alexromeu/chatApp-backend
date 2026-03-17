import http from "http";
import { Server } from "socket.io";
import { errorHandler } from "./middleware/errorHandler";
import messageRoutes from "./routes/messageRoutes";
import signinRoutes from "./routes/registerRoutes"
import loginRoutes from "./routes/loginRoutes"
import chatRoomRoutes from "./routes/chatRoomsRoutes";
import getUsernameRoutes from "./routes/getUsernameRoutes";
import { registerAllSockets } from "./sockets/registerSockets";
import { sequelize } from "./models";
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

const allowedOrigins = [
  process.env.CORS_ORIGIN!,       
  "http://localhost:5173",       
  "http://127.0.0.1:5173"        
];


const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use(getUsernameRoutes);
app.use(messageRoutes);
app.use(signinRoutes);
app.use(loginRoutes);
app.use(chatRoomRoutes);
app.use(errorHandler);
registerAllSockets(io);

sequelize.sync({ alter: false }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port} `);
  });
});
