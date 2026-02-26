import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { UpdateUserService } from "@/services/users/update";

export function makeUpdateUserService() {
  const userRepository = new UserPrismaRepository();
  return new UpdateUserService(userRepository);
}
