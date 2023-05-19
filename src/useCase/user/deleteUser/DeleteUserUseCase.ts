import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteUserUseCase {
    public async deleteUser(id: number) {
        console.log(id);
        try {
            const user = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return { user }
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Failed to delete user.");
        } finally {
            prisma.$disconnect();
        }
    }
}