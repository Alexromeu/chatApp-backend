import { io } from "socket.io-client";

for (let i = 0; i < 100; i++) {
  const socket = io("http://localhost:3000", {
    auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1MTkwNTE5NiwiZXhwIjoxNzUxOTMzOTk2fQ.7x-aMJ4FRZXafkI1veZlyXaRPcb4eGQMpKpCmszMe_8" },
  });

  socket.on("connect", () => {
    console.log(`Client ${i} connected`);
    socket.emit("userOnline", `user${i}`);
    socket.emit("joinRoom", { id: "room1" });
    socket.emit("chatMessage", {
      chatRoomId: "room1",
      userId: `user${i}`,
      content: `Hello from user${i}`,
    });
  });
}
