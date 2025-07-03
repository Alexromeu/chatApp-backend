import { Router } from "express";
import { createMessage, getMessages } from "../controllers/messageController";

const router = Router();
router.post("/messages", createMessage);

router.get("/messages", getMessages);
export default router;
