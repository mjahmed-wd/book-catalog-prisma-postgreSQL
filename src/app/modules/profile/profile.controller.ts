import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from '../user/user.service';

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.userId;

    const result = await UserService.getByIdFromDB(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile fetched successfully',
        data: result
    });
});

export const ProfileController = {
    getByIdFromDB
};