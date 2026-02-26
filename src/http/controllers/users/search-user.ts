import { SearchUsersService } from "@/services/users/search";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const getUsersSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  name: z.string().optional(),
  email: z.string().optional(),
});

export async function searchUsers(req: FastifyRequest, res: FastifyReply) {
  const { name, email, page, perPage } = getUsersSchema.parse(req.query);

  const searchUsersService = new SearchUsersService();

  const data = await searchUsersService.execute({
    name,
    email,
    page,
    perPage,
  });

  return res.send(data);
}
