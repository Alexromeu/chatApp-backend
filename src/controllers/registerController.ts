import { Request, Response } from 'express';
import { User } from '../models/user';
import { createUser } from './userController';

const jwt = require('jsonwebtoken');
import * as dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      res.status(409).json({ error: 'Username already in use' });
      return;
    }

    const newUser = await createUser({ username, password });
    const token = jwt.sign(
      {userId: newUser.id},
      process.env.JWT_SECRET!,
      {expiresIn: '8h'}
    );

    res.status(201).json({
      message: 'User registred',
      user: {
        id: newUser.id,
        username: newUser.username
      }, 
      token
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });

  }
};
