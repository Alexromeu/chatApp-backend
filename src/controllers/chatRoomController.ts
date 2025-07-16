import { Request, Response } from 'express';
import { ChatRoom } from '../models/chatRoom';
import { User } from "../models/user"

export const getChatRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;
    
    const rooms = await ChatRoom.findAll({
      include: {
        model: User,
        where: { id: userId }
      }
    });
    
    res.status(200).json(rooms);
  } catch (err) {

    console.error('Error fetching chat rooms:', err);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};

export const createChatRoom = async (req: Request, res: Response): Promise<void> => {
  const { name, creator } = req.body;
  
  if (!name || !creator) {
    res.status(400).json({ error: 'Room name is required' });
    return;
  } 

  try {
    const newRoom = await ChatRoom.create({ name, creator });
    res.status(201).json(newRoom);

  } catch (err) {
    console.error('Error creating chat room:', err);
    res.status(500).json({ error: 'Failed to create chat room' });
  }
};


export const getAllRooms = async (_: Request, res: Response): Promise<void> => {
  try {
    const rooms = await ChatRoom.findAll(); 
    res.status(200).json(rooms);
  } catch (err) {
    console.error('Error fetching all chat rooms:', err);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
}