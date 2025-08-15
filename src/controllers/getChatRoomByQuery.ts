import { Request, Response } from 'express';
import { ChatRoom } from '../models/chatRoom';

export const getChatRoomByQuery = async (req: Request, res: Response) => {
  const { roomId } = req.query;

  if (!roomId || typeof roomId !== 'string') {
    res.status(400).json({ error: 'roomId query parameter is required and must be a string' });
    return;
  }

  try {
    const room = await ChatRoom.findByPk(roomId);

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    res.status(200).json(room);
    
  } catch (err) {
    console.error('Error fetching room by ID:', err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};
