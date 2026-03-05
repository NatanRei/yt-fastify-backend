import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { UserDetailsService } from "@/services/users/details";
import { beforeEach, describe, expect, it } from "vitest";

let repository: UserInMemoryRepository;
let service: UserDetailsService;

describe("Get User Details", () => {
  beforeEach(() => {
    repository = new UserInMemoryRepository();
    service = new UserDetailsService(repository);
  });

  it("should be able to return a user", async () => {
    const createdUser = await repository.create({
      name: "Natan",
      email: "natan@reis.com",
      passwordHash: "123456",
    });

    const result = await service.execute({ id: createdUser.id });

    expect(result.id).toBe(createdUser.id);
    expect(repository.items[0].id).toBe(result.id);
  });

  it("should be able to return a user", async () => {
    await expect(
      service.execute({ id: "not-found-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
