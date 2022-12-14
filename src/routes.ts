import { Router } from 'express';
import { createUserController } from './useCases/CreateUser';

const router = Router();

router.post('/users', (resquest, response) => {
    return createUserController.handle(resquest, response);
})

export { router }