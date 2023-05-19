import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
    public async deleteUser(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const deleteUser = new DeleteUserUseCase();

        try {
            const user = await deleteUser.deleteUser(id);
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(400).json({
                message: error || "Unexpected error."
            });
        }


    }
}