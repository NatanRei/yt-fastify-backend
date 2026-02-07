import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
  const deleteUserSchema = z.object({
    id: z.uuid(),
  });

  const { id } = deleteUserSchema.parse(req.params);

  await prisma.user.delete({
    where: { id },
  });

  return res.status(204).send();
}
