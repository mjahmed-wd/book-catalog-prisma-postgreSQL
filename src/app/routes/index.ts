import express, { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { profileRoutes } from '../modules/profile/profile.route';

const router = express.Router();

const moduleRoutes: {path: string, route: Router}[] = [
  {
    path: "/auth",
    route: authRoutes
  },
  {
    path: "/users",
    route: userRoutes
  },
  {
    path: "/categories",
    route: categoryRoutes
  },
  {
    path: "/profile",
    route: profileRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
