import { makeUpdateUserService } from "@/factories/users/make-update-user-service";
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

  const updateUserService = makeUpdateUserService();

  await updateUserService.execute({ id, name, email });

  return res.status(204).send();
}
