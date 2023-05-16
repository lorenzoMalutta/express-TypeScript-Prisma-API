import express from 'express';
import { createUser, deleteUser, getUsers } from '../http/controller/userController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id',);

export default router;
