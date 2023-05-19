import IUser from "../../../interface/IUser";
import { PrismaClient } from '@prisma/client';
import { HashPasswordProvider } from "../../../provider/HashPasswordProvider";
import { validateUserInputProvider } from "../../../provider/ValidateUserInputProvider";

const prisma = new PrismaClient();

export class RegisterUserUseCase {
    public async registerUser({ name, email, cpf, password }: IUser) {
        try {

            const validateInputProvider = new validateUserInputProvider();
            const validate = await validateInputProvider.validateInput(name, email, cpf, password);

            const hashPassword = new HashPasswordProvider();
            const hash = await hashPassword.hashPassword(validate.password);

            const userAlreadyExists = await prisma.user.findUnique({
                where: {
                    email: validate.email,
                }
            });

            if (userAlreadyExists) {
                throw new Error('User or Password already exists');
            }

            const user = await prisma.user.create({
                data: {
                    name: validate.name,
                    email: validate.email,
                    cpf: validate.cpf,
                    password: hash
                }
            });

            return { ...user };
        } catch (error) {
            console.log(error);
        } finally {
            await prisma.$disconnect();
        }
    }
}