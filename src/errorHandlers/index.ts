import { Request, Response } from 'express';

export function get404(_: Request, res: Response) {
  return res.status(404).json({ message: 'Page Not Found' });
}

export function get500(_: Request, res: Response) {
  return res.status(500).json({
    message: 'Ups! Something went wrong... We are working hard to solve it',
  });
}
