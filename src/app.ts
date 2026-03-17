import { errorHandler } from "./middleware/errorHandler";
import messageRoutes from "./routes/messageRoutes";
import signinRoutes from "./routes/registerRoutes"
import loginRoutes from "./routes/loginRoutes"
import registerRoutes from "./routes/registerRoutes"
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

const allowedOrigins = [
  process.env.CORS_ORIGIN!,       // production
  "http://localhost:5173",       // local dev
  "http://127.0.0.1:5173"        // some browsers use this
];


app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(registerAllSockets);
app.use(getUsernameRoutes);
app.use(registerRoutes);
app.use(messageRoutes);
app.use(signinRoutes);
app.use(loginRoutes);
app.use(chatRoomRoutes);
app.use(errorHandler);


sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port} `);
  });
});
