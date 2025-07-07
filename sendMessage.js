import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  auth: {
    token: ""
  }
});

socket.on("connect", () => {
  console.log("Connected to server as", socket.id);

  socket.emit("joinRoom", {id:1});
  
  socket.emit("chatMessage", {
    chatRoomId: 1,
    userId: 1,
    content: "Hello from the backend CLI!"
  });

  console.log("chatMessage emitted");
   
 
  setTimeout(() => {
    socket.disconnect();
    console.log("Disconnected from server");
  }, 1000);
});

socket.on("chatMessage", (msg) => {
  console.log("Received chatMessage from server:", msg);
});

socket.on("error", (err) => {
  console.error("Received error from server:", err);
});
