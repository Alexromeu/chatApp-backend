import { app } from "./app";
import { sequelize } from "./models";
import { Server } from "socket.io";
import { registerAllSockets } from "./sockets/registerSockets";
import { socketAuthMiddleware } from "./middleware/socketAuth";

import getLocalIP from "./utils/getIP"

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const http = require('http')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: `${allowedOrigin}`, methods: ["GET", "POST"]} });

const localAdress = getLocalIP()

io.use(socketAuthMiddleware);
registerAllSockets(io)

sequelize.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port} `);
  });
});
