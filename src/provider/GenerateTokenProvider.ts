import { sign } from "jsonwebtoken";

export class GenerateTokenProvider {
    public async generateToken(userId: number) {
        const token = sign({ id: userId }, process.env.TOKEN_SECRET as string, {
            subject: String(userId),
            expiresIn: '15s',
        });
        return token;
    }
}