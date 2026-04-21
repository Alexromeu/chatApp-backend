import { query } from '../config/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// ============ USER QUERIES ============

export const createUser = async (username: string, password: string) => {
  try {
    const id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const result = await query(
      `INSERT INTO "Users" (id, username, password, status) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, username, status, "createdAt"`,
      [id, username, hashedPassword, 'offline']
    );
    
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const result = await query(
      `SELECT * FROM "Users" WHERE username = $1`,
      [username]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const result = await query(
      `SELECT id, username, status, "avatarUrl", "createdAt", "updatedAt" FROM "Users" WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getUsernameById = async (id: string) => {
  try {
    const result = await query(
      `SELECT username FROM "Users" WHERE id = $1`,
      [id]
    );
    return result.rows[0]?.username || null;
  } catch (error) {
    throw error;
  }
};

export const updateUserStatus = async (id: string, status: 'online' | 'offline') => {
  try {
    const result = await query(
      `UPDATE "Users" SET status = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const result = await query(
      `SELECT id, username, status, "avatarUrl", "createdAt" FROM "Users"`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// ============ CHAT ROOM QUERIES ============

export const createChatRoom = async (name: string, creator: string) => {
  try {
    const id = uuidv4();
    const result = await query(
      `INSERT INTO "ChatRooms" (id, name, creator) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [id, name, creator]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getChatRoomById = async (id: string) => {
  try {
    const result = await query(
      `SELECT * FROM "ChatRooms" WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getAllChatRooms = async () => {
  try {
    const result = await query(
      `SELECT * FROM "ChatRooms" ORDER BY "createdAt" DESC`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getChatRoomsByCreator = async (creator: string) => {
  try {
    const result = await query(
      `SELECT * FROM "ChatRooms" WHERE creator = $1 ORDER BY "createdAt" DESC`,
      [creator]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const filterChatRoomByName = async (name: string) => {
  try {
    const result = await query(
      `SELECT * FROM "ChatRooms" WHERE LOWER(name) LIKE LOWER($1) ORDER BY "createdAt" DESC`,
      [`%${name}%`]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const deleteChatRoom = async (id: string) => {
  try {
    const result = await query(
      `DELETE FROM "ChatRooms" WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

// ============ MESSAGE QUERIES ============

export const createMessage = async (
  senderId: string,
  roomId: string,
  content: string,
  sendername: string,
  timestamp?: number
) => {
  try {
    const id = uuidv4();
    const messageTimestamp = timestamp || Date.now();
    
    const result = await query(
      `INSERT INTO "Messages" (id, "senderId", "roomId", content, sendername, timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [id, senderId, roomId, content, sendername, messageTimestamp]
    );
    
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getMessagesByRoomId = async (roomId: string) => {
  try {
    const result = await query(
      `SELECT * FROM "Messages" WHERE "roomId" = $1 ORDER BY "createdAt" ASC`,
      [roomId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getMessagesByUserId = async (userId: string) => {
  try {
    const result = await query(
      `SELECT * FROM "Messages" WHERE "senderId" = $1 ORDER BY "createdAt" DESC`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getAllMessages = async () => {
  try {
    const result = await query(
      `SELECT m.*, u.username FROM "Messages" m 
       LEFT JOIN "Users" u ON m."senderId" = u.id 
       ORDER BY m."createdAt" ASC`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const result = await query(
      `DELETE FROM "Messages" WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const deleteMessagesByRoomId = async (roomId: string) => {
  try {
    const result = await query(
      `DELETE FROM "Messages" WHERE "roomId" = $1`,
      [roomId]
    );
    return result.rowCount || 0;
  } catch (error) {
    throw error;
  }
};
