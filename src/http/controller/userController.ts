import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import User from '../interface/IUser';
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, cpf, password }: User = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            cpf,
            password
        }
    });
    res.status(200).json({ sucess: true });
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, cpf }: User = req.body;
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            email,
            cpf
        }
    });
    res.json(user);
}
