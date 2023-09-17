import { ENUM_USER_ROLE } from './../../../enums/user';
import { Book, Category, Order, Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { OrderPayload } from './order.interface';
import { Or } from '@prisma/client/runtime/library';
import { JwtPayload } from 'jsonwebtoken';

const insertIntoDB = async (data: Order): Promise<Order> => {
  const isBooksExist = await prisma.book.findMany({
    where: {
      id: {
        in: data.orderedBooks.map((book: any) => book?.bookId),
      },
    },
  });

  if (isBooksExist.length !== data.orderedBooks.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exist');
  }

  const result = await prisma.order.create({
    data: {
      userId: data.userId,
      orderedBooks: data.orderedBooks as any,
      createdAt: new Date(),
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions,
  data: JwtPayload
): Promise<IGenericResponse<Order[]>> => {
  const roleBasedWhereCondition =
    data.role === ENUM_USER_ROLE.ADMIN ? {} : { userId: data.userId };

  const result = await prisma.order.findMany({
    where: roleBasedWhereCondition,
  });

  const total = await prisma.order.count({
    where: {
      ...filters,
      ...roleBasedWhereCondition,
    },
  });

  const { page = 0, limit = 0 } = options;

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (
  id: string,
  data: JwtPayload
): Promise<Order | null> => {
  const roleBasedWhereCondition =
    data.role === ENUM_USER_ROLE.ADMIN ? { id } : { id, userId: data.userId };

  const result = await prisma.order.findUnique({
    where: roleBasedWhereCondition
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
