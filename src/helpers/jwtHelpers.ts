import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: { userId: string; role: string },
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign({ ...payload, iat: 1516239022 }, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
