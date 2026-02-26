import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { updateBodySchema } from "@/http/controllers/users/update-user";
import { prisma } from "@/lib/prisma";
import z from "zod";

type UpdateUserServiceProps = z.infer<typeof updateBodySchema> & {
  id: string;
};

export class UpdateUserService {
  async execute({ id, name, email }: UpdateUserServiceProps) {
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

    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }
}
