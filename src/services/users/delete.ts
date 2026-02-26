import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/http/repositories/user-repository";

type DeleteUserServiceProps = {
  id: string;
};

export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserServiceProps) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError(
        "Falha ao deletar usuário, usuário não encontrado",
      );
    }

    await this.userRepository.delete(id);
  }
}
