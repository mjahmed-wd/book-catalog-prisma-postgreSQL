import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserController } from '../user/user.controller';
import { UserValidation } from '../user/user.validations';
import { authValidation } from './auth.validations';
import { AuthController } from './auth.controller';

const router = express.Router();

router.route('/signup').post(
  validateRequest(UserValidation.create),
  UserController.insertIntoDB
);

router.route('/signin').post(
  validateRequest(authValidation.loginZodSchema),
  AuthController.signIn
);

router
  .route('/:id')
  .get(UserController.getByIdFromDB)
  .patch(
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.update),
    UserController.updateIntoDB
  )
  .delete(
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    UserController.deleteFromDB
  );

export const authRoutes = router;
