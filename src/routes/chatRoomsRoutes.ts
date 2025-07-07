import { Router } from "express";
import { getChatRooms, createChatRoom } from "../controllers/chatRoomController"
import { authenticate } from '../middleware/authenticate';
import { registerChatSocket } from '../sockets/registerChatSocket'

const router = Router();

router.get("/chatrooms", authenticate, getChatRooms);
router.post("/chatrooms", authenticate, registerChatSocket);

export default router;