import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { JwtPayload } from 'jsonwebtoken';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId || '';
  const result = await OrderService.insertIntoDB({
    userId,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, []);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await OrderService.getAllFromDB(filters, options, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await OrderService.getByIdFromDB(id, user);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders fetched successfully',
      data: result
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
