import { Prisma, User } from "@/generated/prisma";
import { UserRepository } from "../user-repository";

export class UserInMemoryRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: string): Promise<Omit<User, "passwordHash"> | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    const { passwordHash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = this.items[userIndex];

    const updatedUser = {
      ...user,
      ...data,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };

    this.items[userIndex] = updatedUser;

    return updatedUser;
  }

  async search(data: {
    name?: string;
    email?: string;
    page: number;
    perPage: number;
  }): Promise<{
    data: Omit<User, "passwordHash">[];
    meta: { total: number; page: number; perPage: number; totalPages: number };
  }> {
    let filtered = this.items;

    if (data.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(data.name!.toLowerCase()),
      );
    }

    if (data.email) {
      filtered = filtered.filter((item) =>
        item.email.toLowerCase().includes(data.email!.toLowerCase()),
      );
    }

    const total = filtered.length;

    const startIndex = (data.page - 1) * data.perPage;
    const endIndex = startIndex + data.perPage;

    const paginatedUsers = filtered.slice(startIndex, endIndex);

    const usersWithoutPassword = paginatedUsers.map((user) => {
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    const totalPages = Math.ceil(total / data.perPage);

    return {
      data: usersWithoutPassword,
      meta: {
        total,
        page: data.page,
        perPage: data.perPage,
        totalPages,
      },
    };
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    this.items.splice(userIndex, 1);
  }
}
