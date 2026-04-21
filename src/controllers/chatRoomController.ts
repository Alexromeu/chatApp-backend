import { Request, Response } from 'express';
import { getChatRoomsByCreator, createChatRoom as createChatRoomQuery, getAllChatRooms } from '../utils/queries';

export const getChatRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId as string;
    
    if (!userId) {
      res.status(400).json({ error: 'userId query parameter is required' });
      return;
    }
    
    const rooms = await getChatRoomsByCreator(userId);
    res.status(200).json(rooms);
  } catch (err) {
    console.error('Error fetching chat rooms:', err);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};

export const createChatRoom = async (req: Request, res: Response): Promise<void> => {
  const { name, creator } = req.body;
  
  if (!name || !creator) {
    res.status(400).json({ error: 'Room name and creator are required' });
    return;
  } 

  try {
    const newRoom = await createChatRoomQuery(name, creator);
    res.status(201).json(newRoom);

  } catch (err) {
    console.error('Error creating chat room:', err);
    res.status(500).json({ error: 'Failed to create chat room' });
  }
};


export const getAllRooms = async (_: Request, res: Response): Promise<void> => {
  try {
    const rooms = await getAllChatRooms(); 
    res.status(200).json(rooms);
  } catch (err) {
    console.error('Error fetching all chat rooms:', err);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
}