import { Router } from "express";
import { getChatRooms, createChatRoom } from "../controllers/chatRoomController"
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get("/chatrooms", authenticate, getChatRooms);
router.post("/chatrooms", authenticate, createChatRoom)

export default router;