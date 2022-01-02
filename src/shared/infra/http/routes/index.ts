import { Router } from 'express';
import { authtenticateRoutes } from './authtenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRoutes } from './users.routes';
import { carsRoutes } from './cars.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/cars', carsRoutes);

router.use(authtenticateRoutes);

export { router };