import { Request, Response } from 'express';
import IUser from '../../../interface/IUser';
import { RegisterUserUseCase } from './RegisterUserUseCase'

export class RegisterUserController {

    public async registerUser(req: Request, res: Response) {
        try {
            const { name, email, cpf, password }: IUser = req.body;
            const registerUserUseCase = new RegisterUserUseCase();
            const user = await registerUserUseCase.registerUser({ name, email, cpf, password });
            res.status(201).json({ sucess: true, user });
        } catch (error) {
            res.status(400).json({ sucess: false });
        }
    }
}
