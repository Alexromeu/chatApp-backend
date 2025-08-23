import { Request, Response, NextFunction  } from 'express';
import { verifyToken } from '../utils/verifyToken'


export const authenticate = (req: Request, res: Response, next: NextFunction ):void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  };
    try {
      verifyToken(token);
      next();
    } catch (err) {
      console.error("auth error: ", err),
      res.status(401).json({ error: " invalid or expired token "})
    }
};
