import { Prisma, User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { UserRepository } from "../user-repository";

export class UserPrismaRepository implements UserRepository {
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    });
  }

  async create({
    name,
    email,
    passwordHash,
  }: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  }

  async update(id: string, { name, email }: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }

  async search({
    name,
    email,
    page,
    perPage,
  }: {
    name?: string;
    email?: string;
    page: number;
    perPage: number;
  }) {
    const where = {
      ...(name ? { name: { contains: name } } : {}),
      ...(email ? { email: { contains: email } } : {}),
    };

    const data = await prisma.user.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const total = await prisma.user.count({ where });

    return {
      data,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
