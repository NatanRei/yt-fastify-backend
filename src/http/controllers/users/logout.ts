import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(_: FastifyRequest, res: FastifyReply) {
  res.clearCookie("access_token", { path: "/" });

  return res.status(200).send();
}
