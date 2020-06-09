import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(400).json({ error: 'Token não encontrado' });
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  const decoded = verify(token, secret);

  if (!decoded) {
    return response.status(400).json({ error: 'token invalido' });
  }

  const { sub } = decoded as TokenPayload;

  request.user = {
    id: sub,
  };

  return next();
}
