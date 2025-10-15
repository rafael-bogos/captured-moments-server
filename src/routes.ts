import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/create-user-controller";
import { LoginUserController } from "./controller/login-user-controller";
import { GetUserController } from "./controller/get-user-controller";
import { autenticateToken } from "./middleware/authenticate-token";

export function router(fastify: FastifyInstance) {
    fastify.post('/create-account', async (request: FastifyRequest, response: FastifyReply) => {
        return new CreateUserController().handle(request, response)
    })

    fastify.post('/login', async (request: FastifyRequest, response: FastifyReply) => {
        return new LoginUserController().handle(request, response)
    })

    fastify.get('/get-user', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new GetUserController().handle(request, response)
    })


}