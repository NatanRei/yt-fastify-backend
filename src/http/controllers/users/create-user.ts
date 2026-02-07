import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string({ message: "Name is required" }),
    email: z.email({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }).min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const passwordHash = await hash(password, 6);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return res.status(201).send({ id: user.id });
}
