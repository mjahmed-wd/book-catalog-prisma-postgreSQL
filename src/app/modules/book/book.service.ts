import { Book, Category, Prisma, User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IBookFilterRequest } from './book.interface';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constants';

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

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
      // reviewAndRatings: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    // orderBy:
    //     options.sortBy && options.sortOrder
    //         ? { [options.sortBy]: options.sortOrder }
    //         : {
    //             createdAt: 'desc'
    //         }
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const getBookByCategoryFromDB = async (categoryId: string): Promise<Book[]> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category does not exist');
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getBookByCategoryFromDB,
  updateIntoDB,
  deleteFromDB,
};
