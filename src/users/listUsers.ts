import type { Request, Response } from 'express';
import User from '../models/user.js';
import { get500 } from '../errorHandlers/index.js';
export default async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).send({ users });
  } catch (e) {
    console.error(e);
    return get500(req, res);
  }
};
