import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
  const updateUserIdSchema = z.object({
    id: z.uuid(),
  });

  const { id } = updateUserIdSchema.parse(req.params);

  const updateBodySchema = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.email({ message: "Email is required" }),
  });

  const { name, email } = updateBodySchema.parse(req.body);

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });

  return res.status(204).send();
}
