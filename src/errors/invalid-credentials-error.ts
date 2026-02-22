import { RootError } from "./root";

export class InvalidCredentialsError extends RootError {
  constructor(message?: string) {
    super(message ?? "Falha ao autenticar, email ou senha inválidos");
  }
}
