import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { prisma } from "@/lib/prisma";

type DeleteUserServiceProps = {
  id: string;
};

export class DeleteUserService {
  async execute({ id }: DeleteUserServiceProps) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ResourceNotFoundError(
        "Falha ao deletar usuário, usuário não encontrado",
      );
    }

    await prisma.user.delete({
      where: { id },
    });
  }
}
