import IUser from "../../interface/IUser";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class RegisterUserUseCase {
    public async registerUser({ name, email, cpf, password }: IUser) {
        try {
            const userAlreadyExists = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (userAlreadyExists) {
                throw new Error('User or Password already exists');
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            password = hashPassword;

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    cpf,
                    password: hashPassword
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