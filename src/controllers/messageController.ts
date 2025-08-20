import { Request, Response } from "express";
import { Message } from "../models/message";
import { validate as isUuid } from "uuid";
import { User } from "../models";

export const getMessages = async (req: Request, res: Response) => {
  const { roomId, userId } = req.query;

  const where: any = {};

  if (roomId && typeof roomId === "string" && isUuid(roomId)) {
    where.roomId = roomId;
  }

  if (userId && typeof userId === "string" && isUuid(userId)) {
    where.senderId = userId;
  }

  try {
    const messages = await Message.findAll({ 
      where,
      include: [{ model: User }],
      order: [["createdAt", "ASC"]],

    });

      res.json(messages);
      
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", err});
  }
};
