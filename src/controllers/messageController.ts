import { Request, Response } from "express";
import { getMessagesByRoomId, getMessagesByUserId } from "../utils/queries";
import { validate as isUuid } from "uuid";

export const getMessages = async (req: Request, res: Response) => {
  const { roomId, userId } = req.query;

  try {
    let messages;

    if (roomId && typeof roomId === "string" && isUuid(roomId)) {
      messages = await getMessagesByRoomId(roomId);
    } else if (userId && typeof userId === "string" && isUuid(userId)) {
      messages = await getMessagesByUserId(userId);
    } else {
      res.status(400).json({ error: "roomId or userId query parameter is required" });
      return;
    }

    res.json(messages);
      
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", err});
  }
};
