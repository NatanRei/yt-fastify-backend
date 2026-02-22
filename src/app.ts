import fastify from "fastify";
import z from "zod";

import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

import { authenticate } from "./decorators";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(cors, {
  origin: [env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.decorate("authenticate", authenticate);

app.addHook("preHandler", (req, _, next) => {
  req.jwt = app.jwt;

  return next();
});

app.register(fastifyCookie, {
  secret: env.JWT_SECRET,
  hook: "preHandler",
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
