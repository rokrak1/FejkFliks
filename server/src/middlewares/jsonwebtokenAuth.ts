import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";

const jsonwebtokenAuth = async (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      reply.code(401).send({ message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET || "");
    done();
  } catch (error) {
    reply.code(401).send({ message: `Unauthorized: ${error}` });
    return;
  }
};

export default jsonwebtokenAuth;
