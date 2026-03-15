import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { UpdateUserService } from "@/services/users/update";
import { beforeEach, describe, expect, it } from "vitest";

let repository: UserInMemoryRepository;
let service: UpdateUserService;

describe("Update User", () => {
  beforeEach(() => {
    repository = new UserInMemoryRepository();
    service = new UpdateUserService(repository);
  });

  it("should be able to update a user", async () => {
    const createdUser = await repository.create({
      name: "Natan",
      email: "natan@reis.com",
      passwordHash: "123456",
    });

    const updatedUser = {
      id: createdUser.id,
      name: "Natan Reis",
      email: "natan+1@reis.com",
    };

    await service.execute(updatedUser);

    expect(repository.items[0].name).toBe(updatedUser.name);
    expect(repository.items[0].email).toBe(updatedUser.email);
  });

  it("should be able to throw an ResourceNotFoundError", async () => {
    await expect(
      service.execute({
        id: "not-found-id",
        name: "Natan Reis",
        email: "natan+1@reis.com",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
