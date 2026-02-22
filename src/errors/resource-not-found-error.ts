import { RootError } from "./root";

export class ResourceNotFoundError extends RootError {
  constructor(message?: string) {
    super(message ?? "Recurso não encontrado");
  }
}
