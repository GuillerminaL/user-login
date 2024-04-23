import { Response, Request } from 'express';
import RefreshToken from '../models/refreshToken.js';
import { get500 } from '../errorHandlers/index.js';
import { generateToken } from '../utils/index.js';
export default async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const storedRefreshToken = await RefreshToken.findOne({
      refreshToken: refreshToken,
    });
    if (storedRefreshToken) {
      const {
        token,
        expires,
        refreshToken: newRefreshToken,
      } = generateToken(storedRefreshToken.userEmail);
      const modelRefreshToken = new RefreshToken({
        refreshToken: newRefreshToken,
        userEmail: storedRefreshToken.userEmail,
      });
      await modelRefreshToken.save();

      return res.status(200).json({
        token,
        expires,
        refreshToken: newRefreshToken,
      });
    } else {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  } catch (e) {
    console.error(e);
    return get500(req, res);
  }
};
