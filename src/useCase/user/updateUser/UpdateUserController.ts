import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import IUser from "../../../interface/IUser";

export class UpdateUserController {
    public async updateUser(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const { name, email, cpf, password }: IUser = req.body;
        console.log(id, name, email, cpf, password);
        const updateUser = new UpdateUserUseCase();
        try {
            const user = await updateUser.updateUser({ id, name, email, cpf, password });
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(500).json({
                message: error || "Failed to update user"
            });
        }
    }
}