import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { DeleteUserService } from "@/services/users/delete";
import { beforeEach, describe, expect, it } from "vitest";

let repository: UserInMemoryRepository;
let service: DeleteUserService;

describe("Delete User", () => {
  beforeEach(() => {
    repository = new UserInMemoryRepository();
    service = new DeleteUserService(repository);
  });

  it("should be able to delete a user", async () => {
    const createdUser = await repository.create({
      name: "Natan",
      email: "natan@reis.com",
      passwordHash: "123456",
    });

    await service.execute({ id: createdUser.id });

    expect(repository.items).toHaveLength(0);
  });

  it("should be able to throw an ResourceNotFoundError", async () => {
    await expect(
      service.execute({ id: "not-found-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
