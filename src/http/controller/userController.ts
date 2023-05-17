import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import User from '../../interface/IUser';
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ sucess: false });
    } finally {
        await prisma.$disconnect();
    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ sucess: true, user });
    } catch (error) {
        res.status(400).json({ sucess: false });
    } finally {
        await prisma.$disconnect();
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(201).json({ sucess: true, user });
    } catch (error) {
        res.status(400).json({ sucess: false });
    } finally {
        await prisma.$disconnect();
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
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
        res.json({ sucess: true, user });
    } catch (error) {
        res.status(400).json({ sucess: false });
    } finally {
        await prisma.$disconnect();
    }
}
