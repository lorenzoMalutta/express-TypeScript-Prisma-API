import { PrismaClient } from "@prisma/client";
import IUser from "../../../interface/IUser";
import { validateUserInputProvider } from "../../../provider/ValidateUserInputProvider";
import { HashPasswordProvider } from "../../../provider/HashPasswordProvider";

const prisma = new PrismaClient();

export class UpdateUserUseCase {
    public async updateUser({ id, name, email, cpf, password }: IUser) {

        const validateInputProvider = new validateUserInputProvider();
        const validate = await validateInputProvider.validateInput(name, email, cpf, password);

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email: validate.email,
                id: {
                    not: id
                }
            }
        });

        if (userWithSameEmail) throw new Error("Email already in use.");
        const hash = new HashPasswordProvider();
        const hashedPassword = await hash.hashPassword(validate.password);

        try {
            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    password: hashedPassword,
                    name: validate.name,
                    email: validate.email,
                    cpf: validate.cpf,
                }
            });

            return { user };
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Failed to update user.");
        } finally {
            await prisma.$disconnect();
        }
    }
}
