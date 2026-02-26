import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { DeleteUserService } from "@/services/users/delete";

export function makeDeleteUserService() {
  const userRepository = new UserPrismaRepository();
  return new DeleteUserService(userRepository);
}
