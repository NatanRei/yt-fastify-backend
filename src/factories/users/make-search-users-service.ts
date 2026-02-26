import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { SearchUsersService } from "@/services/users/search";

export function makeSearchUsersService() {
  const userRepository = new UserPrismaRepository();
  return new SearchUsersService(userRepository);
}
