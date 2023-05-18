import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../http/controller/userController';
import { RegisterUserController } from '../useCase/registerUser/RegisterUserController';
import { AuthUserController } from '../useCase/authUser/AuthUserController';
import { ensureToken } from '../middlewares/ensureToken';
import { RefreshTokenController } from '../useCase/refreshToken/RefreshTokenController';

const router = express.Router();

const registerUserController = new RegisterUserController();

const authUserController = new AuthUserController();

const refreshTokenController = new RefreshTokenController();

router.get('/users', ensureToken, getUsers);
router.delete('/users/:id', ensureToken, deleteUser);
router.put('/users/:id', ensureToken, updateUser);
router.get('/users/:id', ensureToken, getUser);

router.post('/refresh-token', refreshTokenController.refreshToken);

router.post('/login', authUserController.authUser);
router.post('/register', registerUserController.registerUser);

export default router;
