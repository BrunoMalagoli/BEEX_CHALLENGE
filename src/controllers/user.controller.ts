import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
export const getUsers = async (req: Request, res: Response) => {
  prisma.$connect();
  const usuarios = await prisma.usuario.findMany();
  res.json({ message: { usuarios } });
  prisma.$disconnect();
};

export const createUser = async (req: Request, res: Response) => {
  prisma.$connect();
  const { nombre, password, email } = req.body;
  const usuario = await prisma.usuario.create({
    data: {
      nombre,
      password,
      email,
    },
  });
  res.json({ message: { usuario } });
  prisma.$disconnect();
};
