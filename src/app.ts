import fastify from "fastify";
import z from "zod";

import cors from "@fastify/cors";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(cors, {
  origin: [env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.setErrorHandler((error, _, res) => {
  if (error instanceof z.ZodError) {
    return res.status(422).send({
      message: "Validation error",
      details: error.format(),
    });
  }

  console.error(error);

  return res.status(500).send({ message: "Internal server error" });
});

app.register(usersRoutes, { prefix: "/users" });
