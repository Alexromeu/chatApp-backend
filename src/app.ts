import { errorHandler } from "./middleware/errorHandler";
import messageRoutes from "./routes/messageRoutes";
import signinRoutes from "./routes/registerRoutes"
import loginRoutes from "./routes/loginRoutes"
import registerRoutes from "./routes/registerRoutes"
import chatRoomRoutes from "./routes/chatRoomsRoutes";
import getUsernameRoutes from "./routes/getUsernameRoutes";
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
const path = require("path");


const ip = `${process.env.CORS_ORIGIN}` || "http://localhost:5173";

dotenv.config();
export const app = express();


app.use(express.json());
app.use(cors({
    origin: ip,
    credentials: true
}));

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", getUsernameRoutes);
app.use("/api", registerRoutes);
app.use("/api", messageRoutes);
app.use("/api", signinRoutes);
app.use("/api", loginRoutes);
app.use("/api", chatRoomRoutes);
app.use("/api", errorHandler);


app.get("/.*/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

