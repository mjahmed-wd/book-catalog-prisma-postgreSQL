import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signIn = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signIn(req.body);

  const newAccessToken = jwtHelpers.createToken(
    {
      userId: result.id,
      role: result.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User sign in successfully!',
    token: newAccessToken,
  });
});

export const AuthController = {
  signIn,
};
