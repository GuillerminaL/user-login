import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ONE_HOUR = 60 * 60 * 1000;

export const generateToken = (id: string) => {
  const token = jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
    expiresIn: '1h',
  });
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + ONE_HOUR);
  return {
    token,
    refreshToken: uuidv4(),
    expires: expiryDate.getTime(),
  };
};
