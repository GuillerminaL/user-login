import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/user.js';
import { get500 } from '../errorHandlers/index.js';

export default async (req: Request, res: Response) => {
  const { email, given_name, family_name, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res
        .status(405)
        .json({ message: `A user with email ${email} already exist ` });
    }
    const newUser = new User({
      email,
      given_name,
      family_name,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).send({
      message: 'User successfully registered!',
      user: newUser,
    });
  } catch (e) {
    console.error(e);
    return get500(req, res);
  }
};
