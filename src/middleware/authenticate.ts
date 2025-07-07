import { Request, Response, NextFunction  } from 'express';
import { verifyToken } from '../utils/verifyToken'


export const authenticate = (req: Request, res: Response, next: NextFunction ):void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  };
    verifyToken(token); 
    next();
};
