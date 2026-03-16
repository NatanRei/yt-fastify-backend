import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { AuthenticateService } from "@/services/users/authenticate";

export function makeAuthenticateService() {
  const userRepository = new UserPrismaRepository();
  return new AuthenticateService(userRepository);
}
