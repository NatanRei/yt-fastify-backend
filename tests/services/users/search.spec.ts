import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { SearchUsersService } from "@/services/users/search";
import { beforeEach, describe, expect, it } from "vitest";

let repository: UserInMemoryRepository;
let service: SearchUsersService;

describe("Search Users", () => {
  beforeEach(async () => {
    repository = new UserInMemoryRepository();
    service = new SearchUsersService(repository);

    await repository.create({
      name: "Natan",
      email: "natan@reis.com",
      passwordHash: "123456",
    });

    await repository.create({
      name: "Maria",
      email: "maria@reis.com",
      passwordHash: "123456",
    });
  });

  it("should be able to search for users", async () => {
    const result = await service.execute({
      page: 1,
      perPage: 1,
    });

    expect(result.data).toHaveLength(1);
    expect(result.meta.page).toBe(1);
    expect(result.meta.perPage).toBe(1);
    expect(result.meta.total).toBe(2);
    expect(result.meta.totalPages).toBe(2);
  });

  it("should be able to filter by name", async () => {
    const result = await service.execute({
      page: 1,
      perPage: 10,
      name: "nat",
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe("Natan");
    expect(result.data[0].email).toBe("natan@reis.com");
  });

  it("should be able to filter by email", async () => {
    const result = await service.execute({
      page: 1,
      perPage: 10,
      name: "natan",
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe("Natan");
    expect(result.data[0].email).toBe("natan@reis.com");
  });
});
