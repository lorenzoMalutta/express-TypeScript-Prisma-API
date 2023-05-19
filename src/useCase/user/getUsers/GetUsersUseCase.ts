import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetUsersUseCase {
    public async getUsers() {
        try {
            const users = await prisma.user.findMany();
            return { users };
        } catch (error) {
            console.error("Error getting user:", error);
            throw new Error("Failed to get user.");
        } finally {
            await prisma.$disconnect();
        }
    }
}