import { AuthUserUseCase } from "./AuthUserUseCase";
import { Request, Response } from "express";
import IAuth from "../../../interface/IAuth";


export class AuthUserController {
    public async authUser(request: Request, response: Response) {
        const { email, password }: IAuth = request.body;

        const authUserUseCase = new AuthUserUseCase();

        const token = await authUserUseCase.authUser({
            email,
            password
        });

        return response.json({ response: true, token });
    }
}