import express from 'express';
import { ProfileController } from './profile.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router
  .route('/')
  .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),ProfileController.getByIdFromDB)

export const profileRoutes = router;
