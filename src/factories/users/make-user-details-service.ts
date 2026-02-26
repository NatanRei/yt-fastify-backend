import { UserPrismaRepository } from "@/http/repositories/prisma/user-prisma-repository";
import { UserDetailsService } from "@/services/users/details";

export function makeUserDetailsService() {
  const userRepository = new UserPrismaRepository();
  return new UserDetailsService(userRepository);
}
