import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { createUser } from "./create-user";
import { deleteUser } from "./delete-user";
import { logout } from "./logout";
import { searchUsers } from "./search-user";
import { updateUser } from "./update-user";
import { userDetails } from "./user-details";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/login", authenticate);
  app.delete("/logout", { preHandler: [app.authenticate] }, logout);
  app.post("", { preHandler: [app.authenticate] }, createUser);
  app.get("/:id", { preHandler: [app.authenticate] }, userDetails);
  app.get("", { preHandler: [app.authenticate] }, searchUsers);
  app.put("/:id", { preHandler: [app.authenticate] }, updateUser);
  app.delete("/:id", { preHandler: [app.authenticate] }, deleteUser);
}
