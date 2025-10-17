import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../service/get-user-service";
import { SearchMomentsService } from "../service/search-moments-service";

export class SearchMomentsController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { user } = request;
        const { query } = request.query as { query: string };

        if (!user) {
            return response.status(400).send({ error: true, message: "User is required" })
        }

        try {
            const searchMomentsService = new SearchMomentsService()
            const searchMoments = await searchMomentsService.execute({ user, query })

            response.status(200).send(searchMoments)
        } catch (error: any) {
            response.status(400).send({ error: true, message: error.message })
        }
    }
}