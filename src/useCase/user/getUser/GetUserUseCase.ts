import { PrismaClient } from "@prisma/client";
import IUser from "../../../interface/IUser";

const prisma = new PrismaClient();

export class GetUserUseCase {
    public async getUser(id: number) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            return { user }
        } catch (error) {
            console.error("Error getting user:", error);
            throw new Error("Failed to get user.");
        } finally {
            await prisma.$disconnect();
        }
    }
}