import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validations';

const router = express.Router();

router
  .route('/')
  .get(CategoryController.getAllFromDB)

router
  .route('/create-category')
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.create),
    CategoryController.insertIntoDB
  );

router
  .route('/:id')
  .get(CategoryController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.update),
    CategoryController.updateIntoDB
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteFromDB);

export const categoryRoutes = router;
