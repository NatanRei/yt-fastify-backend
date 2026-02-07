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

app.get("/users", async (req: FastifyRequest, res: FastifyReply) => {
  const getUsersSchema = z.object({
    page: z.coerce.number().default(1),
    perPage: z.coerce.number().default(10),
    name: z.string().optional(),
    email: z.string().optional(),
  });

  const { name, email, page, perPage } = getUsersSchema.parse(req.query);

  const where = {
    ...(name ? { name: { contains: name } } : {}),
    ...(email ? { email: { contains: email } } : {}),
  };

  const data = await prisma.user.findMany({
    where,
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({ where });

  return res.send({
    data,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    },
  });
});

app.put("/users/:id", async (req: FastifyRequest, res: FastifyReply) => {
  const updateUserIdSchema = z.object({
    id: z.uuid(),
  });

  const { id } = updateUserIdSchema.parse(req.params);

  const updateBodySchema = z.object({
    name: z.string(),
    email: z.email(),
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
});

app.delete("/users/:id", async (req: FastifyRequest, res: FastifyReply) => {
  const deleteUserSchema = z.object({
    id: z.uuid(),
  });

  const { id } = deleteUserSchema.parse(req.params);

  await prisma.user.delete({
    where: { id },
  });

  return res.status(204).send();
});
