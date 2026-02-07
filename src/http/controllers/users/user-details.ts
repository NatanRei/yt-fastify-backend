import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function userDetails(req: FastifyRequest, res: FastifyReply) {
  const getUserSchema = z.object({
    id: z.uuid(),
  });

  const { id } = getUserSchema.parse(req.params);

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.send(user);
}
