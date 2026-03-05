import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { CreateUserService } from "@/services/users/create";
import { beforeEach, describe, expect, it } from "vitest";

let repository: UserInMemoryRepository;
let service: CreateUserService;

describe("Create User", () => {
  beforeEach(() => {
    repository = new UserInMemoryRepository();
    service = new CreateUserService(repository);
  });

  it("should be able to create a user", async () => {
    const data = {
      name: "Natan",
      email: "natan@reis.com",
      password: "123456",
    };

    const result = await service.execute(data);

    expect(result.id).toBeDefined();
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].name).toBe(data.name);
  });
});
