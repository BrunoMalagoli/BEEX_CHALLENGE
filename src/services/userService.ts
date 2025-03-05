import { PrismaClient, Usuario } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async getAllUsers(): Promise<Usuario[]> {
    try {
      await prisma.$connect();
      const usuarios = await prisma.usuario.findMany();
      return usuarios;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }

  async createUser(data: {
    nombre: string;
    email: string;
    fechaNacimiento: Date | null;
    telefono: string | null;
    longitud: number;
    latitud: number;
  }): Promise<Usuario> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.create({
        data,
      });
      return usuario;
    } catch (error) {
      throw new Error("Error creando el usuario " + error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async getOneUser(id: number): Promise<Usuario> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (usuario) {
        return usuario;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
  async getOneUserByEmail(email: string): Promise<Usuario> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          email,
        },
      });
      if (usuario) {
        return usuario;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
  async getUserProfileCompletion(id: number): Promise<number> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (usuario) {
        const { nombre, email, telefono, fechaNacimiento } = usuario;
        const profileCompletion = [
          nombre,
          email,
          telefono,
          fechaNacimiento,
        ].filter((field) => field).length;
        return (profileCompletion / 4) * 100;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
  async updateUserOnWin(id: number): Promise<Usuario> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      const updatedUser = await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          partidasGanadas: {
            increment: 1,
          },
          partidasJugadas: {
            increment: 1,
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
  async updateUserOnLoss(id: number): Promise<Usuario> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      const updatedUser = await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          partidasJugadas: {
            increment: 1,
          },
          partidasPerdidas: {
            increment: 1,
          },
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }

  async getUserTotalMatches(id: number): Promise<number> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      return usuario.partidasJugadas;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }

  async getUserWinRate(id: number): Promise<number> {
    try {
      await prisma.$connect();
      const usuario = await prisma.usuario.findUnique({
        where: {
          id,
        },
      });
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      return (usuario.partidasGanadas / usuario.partidasJugadas) * 100;
    } catch (error) {
      throw new Error("Error del servidor");
    } finally {
      await prisma.$disconnect();
    }
  }
}
