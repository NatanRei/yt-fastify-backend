import { getUsersSchema } from "@/http/controllers/users/search-user";
import { UserRepository } from "@/http/repositories/user-repository";
import z from "zod";

type SearchUserServiceProps = z.infer<typeof getUsersSchema>;

export class SearchUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, page, perPage }: SearchUserServiceProps) {
    const data = await this.userRepository.search({
      name,
      email,
      page,
      perPage,
    });

    return data;
  }
}
