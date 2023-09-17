import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validations';

const router = express.Router();

router
  .route('/')
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.getAllFromDB
  );

router
  .route('/create-order')
  .post(
    auth(ENUM_USER_ROLE.CUSTOMER),
    validateRequest(OrderValidation.create),
    OrderController.insertIntoDB
  );

router
  .route('/:id')
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    OrderController.getByIdFromDB
  );

export const orderRoutes = router;
