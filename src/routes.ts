import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { autenticateToken } from "./middleware/authenticate-token";
import { upload } from "./config/multer";
import { CreateUserController } from "./controller/auth/create-user-controller";
import { AddRegisteredMomentController } from "./controller/moments/add-registered-moment-controller";
import { EditMomentController } from "./controller/moments/edit-moment-controller";
import { GetAllMomentsController } from "./controller/moments/get-all-moments-controller";
import { SearchMomentsController } from "./controller/moments/search-moments-controller";
import { LoginUserController } from "./controller/auth/login-user-controller";
import { GetUserController } from "./controller/auth/get-user-controller";
import { TextEnhancerController } from "./controller/moments/text-enhancer-controller";
import { UploadFileController } from "./controller/upload/upload-file-controller";
import { DeleteFileController } from "./controller/upload/delete-file-controller";
import { DeleteMomentController } from "./controller/moments/delete-moment-controller";


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

    fastify.post('/ia', async (request: FastifyRequest, response: FastifyReply) => {
        return new TextEnhancerController().handle(request, response)
    })

    fastify.post('/image-upload', { preHandler: upload.single("image") }, async (request: FastifyRequest, response: FastifyReply) => {
        return new UploadFileController().handle(request, response)
    })

    fastify.delete('/delete-upload', async (request: FastifyRequest, response: FastifyReply) => {
        return new DeleteFileController().handle(request, response)
    })

    fastify.delete('/delete-moment/:id', { preHandler: autenticateToken }, async (request: FastifyRequest, response: FastifyReply) => {
        return new DeleteMomentController().handle(request, response)
    })
} 