import { FastifyJWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send({
      message: "Authentication required",
    });
  }

  try {
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);

    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      message: "Invalid token",
    });
  }
}
