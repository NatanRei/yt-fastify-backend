import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchUsers(req: FastifyRequest, res: FastifyReply) {
  const getUsersSchema = z.object({
    page: z.coerce.number().default(1),
    perPage: z.coerce.number().default(10),
    name: z.string().optional(),
    email: z.string().optional(),
  });

  const { name, email, page, perPage } = getUsersSchema.parse(req.query);

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

  return res.send({
    data,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    },
  });
}
