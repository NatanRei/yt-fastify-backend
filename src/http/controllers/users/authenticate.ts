import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.email({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  });

  const { email, password } = registerBodySchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ResourceNotFoundError(
      "Falha ao autenticar, email ou senha inválidos",
    );
  }

  const isPasswordValid = await compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }

  const token = req.jwt.sign({
    sub: user.id,
  });

  return res
    .setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    })
    .status(200)
    .send({
      ...user,
      passwordHash: undefined,
    });
}
