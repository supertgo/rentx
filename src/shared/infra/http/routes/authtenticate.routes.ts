import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { Router } from 'express';

const authtenticateRoutes = Router();
const authtenticateUserUseController = new AuthenticateUserController();

authtenticateRoutes.post('/sessions', authtenticateUserUseController.handle);

export { authtenticateRoutes };
