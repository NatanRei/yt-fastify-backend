import fastify from "fastify";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.get("/", async () => {
  return { message: "Hello World!" };
});

app.post("/users", async () => {
  const res = await prisma.user.create({
    data: {
      name: "Natan",
      email: "natan@teste.com",
      passwordHash: "123456"
    }
  })
  return { message: "User created successfully!", user: res };
});