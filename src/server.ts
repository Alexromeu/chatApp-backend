import { app } from "./app";
import { sequelize } from "./models";
import { Server } from "socket.io";
import { registerAllSockets } from "./sockets/registerSockets";
import { socketAuthMiddleware } from "./middleware/socketAuth";


const http = require('http')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"]} });

io.use(socketAuthMiddleware);
registerAllSockets(io)

sequelize.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
