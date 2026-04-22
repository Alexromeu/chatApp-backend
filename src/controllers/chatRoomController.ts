import { Request, Response } from 'express';
import { ChatRoom } from '../models/chatRoom';
import { Message } from '../models/message';
import { User } from "../models/user"
import { sequelize } from '../config/db';

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

export const deleteChatRoom = async (req: Request, res: Response): Promise<void> => {
  const { roomId } = req.params;
  const userId = (req.query.userId as string) || (req.body?.userId as string);

  if (!roomId) {
    res.status(400).json({ error: 'roomId is required' });
    return;
  }

  if (!userId) {
    res.status(400).json({ error: 'userId is required' });
    return;
  }

  const t = await sequelize.transaction();
  try {
    const room = await ChatRoom.findByPk(roomId, { transaction: t });

    if (!room) {
      await t.rollback();
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    if ((room as any).creator !== userId) {
      await t.rollback();
      res.status(403).json({ error: 'Only the room creator can delete this room' });
      return;
    }

    await Message.destroy({ where: { roomId }, transaction: t });
    await room.destroy({ transaction: t });
    await t.commit();

    res.status(200).json({ message: 'Room deleted', roomId });
  } catch (err) {
    await t.rollback();
    console.error('Error deleting chat room:', err);
    res.status(500).json({ error: 'Failed to delete chat room' });
  }
};