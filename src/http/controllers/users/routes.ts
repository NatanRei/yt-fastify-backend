import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { createUser } from "./create-user";
import { deleteUser } from "./delete-user";
import { searchUsers } from "./search-user";
import { updateUser } from "./update-user";
import { userDetails } from "./user-details";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/login", authenticate);
  app.post("", createUser);
  app.get("/:id", userDetails);
  app.get("", searchUsers);
  app.put("/:id", updateUser);
  app.delete("/:id", deleteUser);
}
