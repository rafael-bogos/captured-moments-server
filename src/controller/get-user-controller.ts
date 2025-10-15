import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../service/get-user-service";

export class GetUserController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { user } = request;

        if (!user) {
            return response.status(400).send({ error: true, message: "User is required" })
        }

        try {
            const getUserService = new GetUserService()
            const userResponse = await getUserService.execute({ user })

            response.status(200).send(userResponse)

        } catch (error: any) {
            response.status(400).send({ error: true, message: error.message })
        }
    }
}