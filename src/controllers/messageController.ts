import { Request, Response } from "express";
import { Message } from "../models/message";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Message creation failed" });
  }
};

export const getMessages = async (_: Request, res: Response) => {
  try {
    const messages = await Message.findAll({ include: ["User"] });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
