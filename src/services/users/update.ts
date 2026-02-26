import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { updateBodySchema } from "@/http/controllers/users/update-user";
import { UserRepository } from "@/http/repositories/user-repository";
import z from "zod";

type UpdateUserServiceProps = z.infer<typeof updateBodySchema> & {
  id: string;
};

export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, name, email }: UpdateUserServiceProps) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError(
        "Falha ao atualizar usuário, usuário não encontrado",
      );
    }

    await this.userRepository.update(id, { name, email });
  }
}
