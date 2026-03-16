import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { authenticateBodySchema } from "@/http/controllers/users/authenticate";
import { UserRepository } from "@/http/repositories/user-repository";
import { compare } from "bcryptjs";
import z from "zod";

type AuthenticateServiceProps = z.infer<typeof authenticateBodySchema> & {
  sign: (payload: object) => string;
};

export class AuthenticateService {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, sign }: AuthenticateServiceProps) {
    const user = await this.userRepository.findByEmail(email);

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
