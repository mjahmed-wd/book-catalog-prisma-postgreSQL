import express, { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { profileRoutes } from '../modules/profile/profile.routes';
import { bookRoutes } from '../modules/book/book.routes';
import { orderRoutes } from '../modules/order/order.routes';

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
  {
    path: "/books",
    route: bookRoutes
  },
  {
    path: "/orders",
    route: orderRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
