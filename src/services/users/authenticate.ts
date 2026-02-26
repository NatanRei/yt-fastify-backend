import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { authenticateBodySchema } from "@/http/controllers/users/authenticate";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import z from "zod";

type AuthenticateServiceProps = z.infer<typeof authenticateBodySchema> & {
  sign: (payload: object) => string;
};

export class AuthenticateService {
  async execute({ email, password, sign }: AuthenticateServiceProps) {
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

    return sign({
      sub: user.id,
    });
  }
}
