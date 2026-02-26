import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserRepository } from "@/http/repositories/user-repository";

type UserDetailsServiceProps = {
  id: string;
};

export class UserDetailsService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: UserDetailsServiceProps) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError("Usuário não encontrado");
    }

    return user;
  }
}
