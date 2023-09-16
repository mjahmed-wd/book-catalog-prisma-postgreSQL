import { Book, Category, Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const isExist = await prisma.book.findFirst({
    where: {
      title: data.title,
      author: data.author,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book already exist');
  }

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist');
  }

  const result = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      genre: data.genre,
      price: data.price,
      publicationDate: data.publicationDate,
      category: {
        connect: {
          id: data.categoryId,
        },
      },
    },
  });
  return result;
};

// const getAllFromDB = async (
//   filters: any,
//   options: IPaginationOptions
// ): Promise<IGenericResponse<Category[]>> => {
//   const result = await prisma.category.findMany({});

//   const total = await prisma.category.count({
//     where: {
//       ...filters,
//     },
//   });
//   const { page = 0, limit = 0 } = options;

//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

// const getByIdFromDB = async (id: string): Promise<Category | null> => {
//   const result = await prisma.category.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       books: true,
//     },
//   });
//   return result;
// };

// const updateIntoDB = async (
//   id: string,
//   payload: Partial<Category>
// ): Promise<Category> => {
//   const result = await prisma.category.update({
//     where: {
//       id,
//     },
//     data: payload,
//     include: {
//       books: true,
//     },
//   });
//   return result;
// };

// const deleteFromDB = async (id: string): Promise<Category> => {
//   const result = await prisma.category.delete({
//     where: {
//       id,
//     },
//     include: {
//       books: true,
//     },
//   });
//   return result;
// };

export const BookService = {
  insertIntoDB,
  //   getAllFromDB,
  //   getByIdFromDB,
  //   updateIntoDB,
  //   deleteFromDB,
};
