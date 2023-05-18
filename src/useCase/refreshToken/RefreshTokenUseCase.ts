import { PrismaClient } from "@prisma/client"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export class RefreshTokenUseCase {
    public async refreshToken(refresh_Token: number) {
        const refreshToken = await prisma.refreshToken.findFirst({
            where: {
                id: refresh_Token
            }
        })

        if (!refreshToken) {
            throw new Error('Refresh Token not found');
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.generateToken(refreshToken.userId);

        if (refreshTokenExpired) {
            await prisma.refreshToken.delete({
                where: {
                    id: refreshToken.id
                }
            });

            const generateFreshTokenProvider = new GenerateTokenProvider();
            const freshToken = await generateFreshTokenProvider.generateToken(refreshToken.userId);

            return { freshToken, token };
        }

        return token;
    }
}