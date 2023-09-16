import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookController } from './book.controller';
import { BookValidation } from './book.validations';
const router = express.Router();

router
  .route('/')
  .get(BookController.getAllFromDB)

router
  .route('/create-book')
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(BookValidation.create),
    BookController.insertIntoDB
  );

router
  .route('/:categoryId/category')
  .get(BookController.getBookByCategoryFromDB)

router
  .route('/:id')
  .get(BookController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(BookValidation.update),
    BookController.updateIntoDB
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDB);

export const bookRoutes = router;
