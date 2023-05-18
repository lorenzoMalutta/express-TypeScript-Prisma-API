import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs"

const prisma = new PrismaClient();

export class GenerateRefreshToken {
    public async generateRefreshToken(userId: number) {
        const expiresIn = dayjs().add(15, 'second').unix();
        const generateRefreshToken = await prisma.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });

        return generateRefreshToken;
    }
}