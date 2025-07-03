import { app } from "./app";
import { sequelize } from "./models";
import { Server } from "socket.io";
import { registerChatSocket } from "./sockets/registerChatSocket";
const http = require('http')

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

registerChatSocket(io);

sequelize.sync({ alter: true, force: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
