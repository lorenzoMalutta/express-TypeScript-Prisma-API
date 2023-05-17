import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../http/controller/userController';
import { RegisterUserController } from '../useCase/registerUser/RegisterUserController';
import { AuthUserController } from '../useCase/authUser/AuthUserController';

const router = express.Router();

const registerUserController = new RegisterUserController();

const authUserController = new AuthUserController();

router.get('/users', getUsers);
router.post('/users', registerUserController.registerUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/users/:id', getUser);

router.post('/login', authUserController.authUser);

export default router;
