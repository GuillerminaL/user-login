import bcrypt from 'bcrypt';

import type { Request, Response } from 'express';
import User from '../models/user.js';
import { get500 } from '../errorHandlers/index.js';
import RefreshToken from '../models/refreshToken.js';
import { generateToken } from '../utils/index.js';

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
      const { token, expires, refreshToken } = generateToken(email as string);
      const newRefreshToken = new RefreshToken({
        refreshToken,
        userEmail: email,
      });
      await newRefreshToken.save();

      return res.status(200).json({
        token,
        expires,
        refreshToken: newRefreshToken,
      });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  } catch (e) {
    console.error(e);
    return get500(req, res);
  }
};
