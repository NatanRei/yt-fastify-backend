import { Prisma, User } from "@/generated/prisma";

export interface UserRepository {
  findById(id: string): Promise<Omit<User, "passwordHash"> | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  search(data: {
    name?: string;
    email?: string;
    page: number;
    perPage: number;
  }): Promise<{
    data: Omit<User, "passwordHash">[];
    meta: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
    };
  }>;
  delete(id: string): Promise<void>;
}
