import express, { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes: {path: string, route: Router}[] = [
  {
    path: "/user",
    route: userRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
