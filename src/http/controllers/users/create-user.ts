import { CreateUserService } from "@/services/users/create";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const registerBodySchema = z.object({
  name: z.string({ message: "Name is required" }),
  email: z.email({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }).min(6),
});

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(req.body);

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  return res.status(201).send({ id: user.id });
}
