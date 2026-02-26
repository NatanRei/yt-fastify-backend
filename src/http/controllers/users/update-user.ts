import { UpdateUserService } from "@/services/users/update";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const updateBodySchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
});

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
  const updateUserIdSchema = z.object({
    id: z.uuid(),
  });

  const { id } = updateUserIdSchema.parse(req.params);

  const { name, email } = updateBodySchema.parse(req.body);

  const updateUserService = new UpdateUserService();

  await updateUserService.execute({ id, name, email });

  return res.status(204).send();
}
