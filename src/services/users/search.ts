import { getUsersSchema } from "@/http/controllers/users/search-user";
import { prisma } from "@/lib/prisma";
import z from "zod";

type SearchUserServiceProps = z.infer<typeof getUsersSchema>;

export class SearchUsersService {
  async execute({ name, email, page, perPage }: SearchUserServiceProps) {
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
}
