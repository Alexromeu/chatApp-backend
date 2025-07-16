import { Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication token missing'));
  }

   try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === 'object' && 'userId' in payload) {
      socket.data.userId = (payload as JwtPayload & { userId: string }).userId; 
      next();
      
    } else {
      next(new Error('Invalid token payload'));
    }

  } catch (error) {
    next(new Error('Authentication failed'));
  }
};
