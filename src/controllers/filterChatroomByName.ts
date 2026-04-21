import { Request, Response } from "express";
import { filterChatRoomByName } from "../utils/queries";

export const filterChatroomByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Missing or invalid room name" });
    return; 
  }

  try {
    const rooms = await filterChatRoomByName(name.trim());
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
