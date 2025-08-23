 import { Router } from "express";
 import { getUsernameById } from "../controllers/getUsernameById"
 
 const router = Router();
 
router.get("/user/:id", getUsernameById)

export default router