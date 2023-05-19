import express from 'express';
import { RegisterUserController } from '../useCase/user/registerUser/RegisterUserController';
import { AuthUserController } from '../useCase/authorization/authUser/AuthUserController';
import { ensureToken } from '../middlewares/ensureToken';
import { RefreshTokenController } from '../useCase/authorization/refreshToken/RefreshTokenController';
import { GetUsersController } from '../useCase/user/getUsers/GetUsersController';
import { GetUserController } from '../useCase/user/getUser/GetUserController';
import { UpdateUserController } from '../useCase/user/updateUser/UpdateUserController';
import { DeleteUserController } from '../useCase/user/deleteUser/DeleteUserController';

const router = express.Router();

const registerUserController = new RegisterUserController();

const authUserController = new AuthUserController();

const refreshTokenController = new RefreshTokenController();

const deleteUserController = new DeleteUserController();

const updateUserController = new UpdateUserController();

const getUserController = new GetUserController();

const getUsersController = new GetUsersController();

router.get('/users', getUsersController.getUsers);
router.delete('/users/:id', deleteUserController.deleteUser);
router.put('/users/:id', updateUserController.updateUser);
router.get('/users/:id', getUserController.getUser);

router.post('/refresh-token', refreshTokenController.refreshToken);

router.post('/login', authUserController.authUser);
router.post('/register', registerUserController.registerUser);

export default router;
