import { makeUserDetailsService } from "@/factories/users/make-user-details-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function userDetails(req: FastifyRequest, res: FastifyReply) {
  const getUserSchema = z.object({
    id: z.uuid(),
  });

  const { id } = getUserSchema.parse(req.params);

  const userDetailsService = makeUserDetailsService();

  try {
    const user = await userDetailsService.execute({ id });

    return res.send(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({ message: err.message });
    }
  }
}
