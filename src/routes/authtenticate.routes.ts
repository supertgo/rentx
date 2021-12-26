import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

const authtenticateRoutes = Router();
const authtenticateUserUseController = new AuthenticateUserController();

authtenticateRoutes.post('/sessions', authtenticateUserUseController.handle);

export { authtenticateRoutes };
