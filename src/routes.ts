import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/create-user-controller";
import { LoginUserController } from "./controller/login-user-controller";

export function router(fastify: FastifyInstance) {
    fastify.post('/create-account', async (request: FastifyRequest, response: FastifyReply) => {
        return new CreateUserController().handle(request, response)
    })

    fastify.post('/login', async (request: FastifyRequest, response: FastifyReply) => {
        return new LoginUserController().handle(request, response)
    })


}