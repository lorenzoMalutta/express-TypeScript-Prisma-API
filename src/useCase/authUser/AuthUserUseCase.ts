import IAuth from "../../interface/IAuth";
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthUserUseCase {
    public async authUser({ email, password }: IAuth) {
        try {
            const userAlreadyExists = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!userAlreadyExists) {
                throw new Error('User or Password not found');
            }

            const passwordMatch = await compare(password, userAlreadyExists.password);

            if (!passwordMatch) {
                throw new Error('User or Password not found');
            }

            const token = sign({ id: password }, process.env.TOKEN_SECRET as string, {
                subject: String(userAlreadyExists.id),
                expiresIn: '15s',
            });

            return token;

        } catch (error) {
            console.log(error);
            throw new Error('Authentication failed');
        } finally {
            await prisma.$disconnect();
        }
    }
}
