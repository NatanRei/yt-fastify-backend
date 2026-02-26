import { registerBodySchema } from "@/http/controllers/users/create-user";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import z from "zod";

type CreateUserServiceProps = z.infer<typeof registerBodySchema>;

export class CreateUserService {
  async execute({ name, email, password }: CreateUserServiceProps) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hash(password, 6),
      },
    });

    return user;
  }
}
