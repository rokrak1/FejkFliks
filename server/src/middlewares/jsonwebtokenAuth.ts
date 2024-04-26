import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

const jsonwebtokenAuth = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      reply.code(401).send({ message: "Unauthorized" });
      done(new Error("Unauthorized"));
      return;
    }
    jwt.verify(token, process.env.SUPABASE_JWT_SECRET || "");
    done();
  } catch (error) {
    reply.code(401);
    done(new Error("Unauthorized"));
  }
};

export default jsonwebtokenAuth;
