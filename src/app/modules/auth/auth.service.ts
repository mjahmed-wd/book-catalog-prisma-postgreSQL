import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IAuthRequest } from './auth.interface';

const signIn = async (data: IAuthRequest): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  const isPasswordMatch = await bcrypt.compare(
    data.password,
    isUserExist?.password || ''
  );

  if (isUserExist) {
    return isUserExist;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong email or password');
};



export const AuthService = {
  signIn,
};

