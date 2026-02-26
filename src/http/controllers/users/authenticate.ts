import { AuthenticateService } from "@/services/users/authenticate";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const authenticateBodySchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z.string({ message: "Password is required" }),
});

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const data = authenticateBodySchema.parse(req.body);

  const authenticateService = new AuthenticateService();

  const token = await authenticateService.execute({
    ...data,
    sign: req.jwt.sign,
  });

  return res
    .setCookie("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    })
    .status(200)
    .send();
}
