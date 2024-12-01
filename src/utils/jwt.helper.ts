import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const generateTokens = (userId: string): { accessToken: string } => {
  const accessToken = generateAccessToken(userId);
  return { accessToken };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err: any) {
    throw new Error('cant verify token ' + err);
  }
};
