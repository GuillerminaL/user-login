import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import User from '../models/user.js';
import { get500 } from '../errorHandlers/index.js';

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (
      existingUser.password &&
      bcrypt.compareSync(password, existingUser.password)
    ) {
      const token = jwt.sign(
        { id: existingUser.id },
        `${process.env.SECRET_KEY}`,
        {
          expiresIn: '1h',
        },
      );
      const expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime() + 60 * 60 * 1000);
      return res.status(200).json({ token, expires: expiryDate.getTime() });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (e) {
    console.error(e);
    return get500(req, res);
  }
};
