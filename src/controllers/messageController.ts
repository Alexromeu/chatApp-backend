import { Request, Response } from "express";
import { Message } from "../models/message";

export const getMessages = async (_: Request, res: Response) => {

  try {
    const messages = await Message.findAll({ include: ["User"] });
    res.json(messages);
  } catch {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
