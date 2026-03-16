import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UserInMemoryRepository } from "@/http/repositories/in-memory/user-in-memory-repository";
import { AuthenticateService } from "@/services/users/authenticate";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
}));

let repository: UserInMemoryRepository;
let service: AuthenticateService;

describe("Authenticate User", () => {
  const mockSign = vi.fn().mockImplementation(() => "token");

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    service = new AuthenticateService(repository);
  });

  it("should be able to return a user", async () => {
    const user = {
      id: "mocked_id",
      email: "natan@reis.com",
      password: "123",
    };
    const res = await repository.create({
      name: "Natan",
      email: user.email,
      passwordHash: user.password,
    });
    (compare as any).mockResolvedValue(true);

    const token = await service.execute({
      email: "natan@reis.com",
      password: "123",
      sign: mockSign,
    });

    expect(token).toBe("token");
    expect(mockSign).toHaveBeenCalledWith({ sub: res.id });
  });

  it("should throw a ResourceNotFoundError when the user does not exists", async () => {
    await expect(
      service.execute({
        email: "natan@reis.com",
        password: "123",
        sign: mockSign,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should throw a InvalidCredentialsError when the password does not match", async () => {
    (compare as any).mockResolvedValue(false);

    await repository.create({
      name: "Natan",
      email: "natan@reis.com",
      passwordHash: "123",
    });
      
    await expect(
      service.execute({
        email: "natan@reis.com",
        password: "123",
        sign: mockSign,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
