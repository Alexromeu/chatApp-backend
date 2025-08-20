import { Request, Response } from "express";
import { Message } from "../models/message";
import { validate as isUuid } from "uuid";

export const getMessages = async (req: Request, res: Response) => {
  const { roomId, userId } = req.query;

  

  const where: any = {};

  if (roomId && typeof roomId === "string" && isUuid(roomId)) {
    where.roomId = roomId;
  }

  if (userId && typeof userId === "string" && isUuid(userId)) {
    where.userId = userId;
  }

  try {
    const messages = await Message.findAll({ 
      where,
      include: ["User"],
      order: [["createdAt", "ASC"]],
    });
      console.log("****", messages)
      res.json(messages);
      
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
