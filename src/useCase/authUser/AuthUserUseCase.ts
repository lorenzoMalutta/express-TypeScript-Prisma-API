import IAuth from "../../interface/IAuth";
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

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

            await prisma.refreshToken.deleteMany({
                where: {
                    userId: userAlreadyExists.id
                }
            });

            const generateTokenProvider = new GenerateTokenProvider();
            const token = await generateTokenProvider.generateToken(userAlreadyExists.id);

            const generateRefreshToken = new GenerateRefreshToken();

            const refreshToken = await generateRefreshToken.generateRefreshToken(userAlreadyExists.id);

            return { token, refreshToken };

        } catch (error) {
            console.log(error);
            throw new Error('Authentication failed');
        } finally {
            await prisma.$disconnect();
        }
    }
}
