import { Request, Response } from 'express';
import { User } from '../models/user';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret'; // Replace in production

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
    }
        
  try {
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid password' });
    return;
    }
  } catch (err) {
    console.error('Bcrypt error:', err);
    res.status(500).json({ error: 'Error comparing passwords' });
    return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '8h',
    });
    
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
