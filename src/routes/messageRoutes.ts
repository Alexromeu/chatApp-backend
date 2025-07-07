import { Router } from "express";
import { getMessages } from "../controllers/messageController";
import { authenticate } from "../middleware/authenticate";
import { registerChatSocket } from "../sockets/registerChatSocket";


const router = Router();

router.get("/messages", authenticate, getMessages);
export default router;
