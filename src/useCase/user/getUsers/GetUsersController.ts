import { Request, Response } from "express";
import { GetUsersUseCase } from "./GetUsersUseCase";

export class GetUsersController {
    public async getUsers(req: Request, res: Response) {
        const getUsers = new GetUsersUseCase();

        try {
            const users = await getUsers.getUsers();
            console.log(users);
            return res.status(200).json(users);
        } catch (error) {
            console.error("Error retrieving users:", error);
            return res.status(500).json({ success: false, message: "Failed to retrieve users." });
        }
    }
}
