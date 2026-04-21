import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

export const pool = new Pool({
  user: db_user,
  password: db_password,
  host: db_host,
  port: Number(db_port) || 5432,
  database: db_name,
  ssl: false
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');
    
    // Create User table
    await query(`
      CREATE TABLE IF NOT EXISTS "Users" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        "avatarUrl" VARCHAR(255),
        status VARCHAR(50) DEFAULT 'offline',
        password VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create ChatRoom table
    await query(`
      CREATE TABLE IF NOT EXISTS "ChatRooms" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        creator UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Message table
    await query(`
      CREATE TABLE IF NOT EXISTS "Messages" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "senderId" UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
        "roomId" UUID NOT NULL REFERENCES "ChatRooms"(id) ON DELETE CASCADE,
        content VARCHAR(1000) NOT NULL,
        timestamp BIGINT,
        sendername VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};
