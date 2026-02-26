import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { CreateUserService } from "@/services/users/create";

export function makeCreateUserService() {
  const userRepository = new UserPrismaRepository();
  return new CreateUserService(userRepository);
}
