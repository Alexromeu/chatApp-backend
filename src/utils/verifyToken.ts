import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const verifyToken = (token: string):any => {

    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
        
    } catch (error) {
       console.log("Este es el error que estamos recibiendo: ", error)
        throw new Error('Token inválido o expirado');
};
}