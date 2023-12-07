import jwt from 'jsonwebtoken';

const SECRET_KEY = '07bae8b8b1abf0b6e836ffb20f59eed6a1908c111ae3f9864a77a6a9fe1ee445'; // se cambia a .env

export function generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET_KEY);
}