import express, { Router } from 'express';

const router = express.Router();

const moduleRoutes: {path: string, route: Router}[] = [
  // ... routes
  // {
  //   path: "/academic-semesters",
  //   route: AcademicSemesterRoutes
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
