import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureToken(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");
    try {
        verify(token, process.env.TOKEN_SECRET as string);
        return next();
    } catch (error) {
        return response.status(401).end();
    }

}