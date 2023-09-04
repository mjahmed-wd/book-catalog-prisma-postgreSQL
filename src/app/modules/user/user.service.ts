import {
    Prisma,
    User
} from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { userRelationalFields, userRelationalFieldsMapper, userSearchableFields } from './user.constants';
import { IStudentFilterRequest } from './user.interface';

const insertIntoDB = async (data: User): Promise<User> => {
    const result = await prisma.user.create({
        data,
        include: {
            reviewAndRatings: true,
            orders: true
        }
    });
    return result;
};

const getAllFromDB = async (
    filters: IStudentFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (userRelationalFields.includes(key)) {
                    return {
                        [userRelationalFieldsMapper[key]]: {
                            id: (filterData as any)[key]
                        }
                    };
                } else {
                    return {
                        [key]: {
                            equals: (filterData as any)[key]
                        }
                    };
                }
            })
        });
    }

    const whereConditions: Prisma.UserWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.user.findMany({
        include: {
            reviewAndRatings: true,
            orders: true
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
    const total = await prisma.user.count({
        where: whereConditions
    });

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            reviewAndRatings: true,
            orders: true
        }
    });
    return result;
};

const updateIntoDB = async (id: string, payload: Partial<User>): Promise<User> => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
        include: {
            reviewAndRatings: true,
            orders: true
        }
    });
    return result;
}

const deleteFromDB = async (id: string): Promise<User> => {
    const result = await prisma.user.delete({
        where: {
            id
        },
        include: {
            reviewAndRatings: true,
            orders: true
        }
    })
    return result;
}


export const UserService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateIntoDB,
    deleteFromDB
};