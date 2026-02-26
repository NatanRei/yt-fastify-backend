import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { prisma } from "@/lib/prisma";

type UserDetailsServiceProps = {
  id: string;
};

export class UserDetailsService {
  async execute({ id }: UserDetailsServiceProps) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new ResourceNotFoundError(
        "Falha ao detalhar usuário, usuário não encontrado",
      );
    }

    return user;
  }
}
