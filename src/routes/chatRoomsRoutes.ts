import { Router } from "express";
import { getChatRooms, createChatRoom, getAllRooms } from "../controllers/chatRoomController"
import { authenticate } from '../middleware/authenticate';



const router = Router();

router.get("/chatrooms", authenticate, getChatRooms);
router.post("/chatrooms", authenticate, createChatRoom);
router.get("/chatrooms/all", authenticate, getAllRooms);


export default router;