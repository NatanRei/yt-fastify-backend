import { registerBodySchema } from "@/http/controllers/users/create-user";
import { UserRepository } from "@/http/repositories/user-repository";
import { hash } from "bcryptjs";
import z from "zod";

type CreateUserServiceProps = z.infer<typeof registerBodySchema>;

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserServiceProps) {
    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: await hash(password, 6),
    });

    return user;
  }
}
