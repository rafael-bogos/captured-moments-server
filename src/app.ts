import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { router } from "./routes";

export const app = fastify({ logger: true })

app.register(router)

