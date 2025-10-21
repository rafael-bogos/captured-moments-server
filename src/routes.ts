import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/create-user-controller";
import { LoginUserController } from "./controller/login-user-controller";
import { GetUserController } from "./controller/get-user-controller";
import { autenticateToken } from "./middleware/authenticate-token";
import { AddRegisteredMomentController } from "./controller/add-registered-moment-controller";
import { GetAllMomentsController } from "./controller/get-all-moments-controller";
import { SearchMomentsController } from "./controller/search-moments-controller";
import { EditMomentController } from "./controller/edit-moment-controller";

export function router(fastify: FastifyInstance) {
    fastify.post('/create-account', async (request: FastifyRequest, response: FastifyReply) => {
        return new CreateUserController().handle(request, response)
    })

    fastify.post('/add-registered-moment', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new AddRegisteredMomentController().handle(request, response)
    })

    fastify.put('/edit-moment/:id', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new EditMomentController().handle(request, response)
    })

    fastify.get('/get-all-moments', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new GetAllMomentsController().handle(request, response)
    })

    fastify.get('/search-moments', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new SearchMomentsController().handle(request, response)
    })

    fastify.post('/login', async (request: FastifyRequest, response: FastifyReply) => {
        return new LoginUserController().handle(request, response)
    })

    fastify.get('/get-user', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new GetUserController().handle(request, response)
    })
} 