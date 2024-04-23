import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    try {
      const isValid = jwt.verify(token, `${process.env.SECRET_KEY}`);
      if (isValid) {
        return next();
      }
    } catch (e) {
      console.error(e);
    }
  }
  return res.status(401).send('Invalid access token. Access not allowed');
}
