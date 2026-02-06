import { hash } from "bcryptjs";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.get("/", async () => {
  return { message: "Hello World!" };
});

app.post("/users", async (req: FastifyRequest, res: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
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
});

app.get("/users/:id", async (req: FastifyRequest, res: FastifyReply) => {
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
});
