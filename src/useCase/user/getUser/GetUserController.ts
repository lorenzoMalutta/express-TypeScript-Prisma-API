import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
    public async getUser(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        console.log(id);

        const getUser = new GetUserUseCase();

        try {
            const user = await getUser.getUser(id);
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(404).json({
                message: error || "User not found."
            });
        }
    }
}