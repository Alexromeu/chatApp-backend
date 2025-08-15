import { Router } from "express";
import { getChatRooms, createChatRoom, getAllRooms } from "../controllers/chatRoomController"
import { authenticate } from '../middleware/authenticate';
import { getChatRoomByQuery } from "../controllers/getChatRoomByQuery";
import { filterChatroomByName } from "../controllers/filterChatroomByName"



const router = Router();

router.get("/chatrooms", authenticate, getChatRooms);
router.post("/chatrooms", authenticate, createChatRoom);
router.get("/chatrooms/all", authenticate, getAllRooms);
router.get("/getRoom", getChatRoomByQuery);
router.get("/filterRoom", filterChatroomByName);



export default router;