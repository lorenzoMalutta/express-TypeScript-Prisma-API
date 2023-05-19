import { RefreshTokenUseCase } from "./RefreshTokenUseCase";
import { Request, Response } from "express";

export class RefreshTokenController {
    public async refreshToken(request: Request, response: Response) {
        const { refresh_Token } = request.body;

        const refreshTokenUseCase = new RefreshTokenUseCase();

        const token = await refreshTokenUseCase.refreshToken(refresh_Token);

        response.json({ token });
    }
}
