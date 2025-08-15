import { Request, Response } from "express";
import { ChatRoom } from "../models/chatRoom";
import { Op } from "sequelize";

export const filterChatroomByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Missing or invalid room name" });
    return; 
  }

  try {
    const rooms = await ChatRoom.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name.trim()}%`,
        },
      },
    });
   console.log(rooms)
    res.json(rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
