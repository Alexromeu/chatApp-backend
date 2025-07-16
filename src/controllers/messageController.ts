import { Request, Response } from "express";
import { Message } from "../models/message";

export const getMessages = async (req: Request, res: Response) => {
  const { roomId, userId } = req.query;

  const where: any = {};

  if (roomId) where.roomId = roomId;
  if (userId) where.userId = userId;

  try {
    const messages = await Message.findAll({ 
      where,
      include: ["User"],
      order: [["createdAt", "ASC"]],
    });
      res.json(messages);

  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
