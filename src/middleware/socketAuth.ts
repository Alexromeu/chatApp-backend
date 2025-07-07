import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication token missing'));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(payload, typeof payload)
   // socket.data.userId = payload.userId;
    next();

  } catch (error) {
    next(new Error('Authentication failed'));
  }
};
