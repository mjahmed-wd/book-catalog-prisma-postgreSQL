import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validations';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router
  .route('/')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB)
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.create),
    UserController.insertIntoDB
  );

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.update),
    UserController.updateIntoDB
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteFromDB);

export const userRoutes = router;
