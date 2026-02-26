import { DeleteUserService } from "@/services/users/delete";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
  const deleteUserSchema = z.object({
    id: z.uuid(),
  });

  const { id } = deleteUserSchema.parse(req.params);

  const deleteUserService = new DeleteUserService();

  await deleteUserService.execute({ id });

  return res.status(204).send();
}
