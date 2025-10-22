import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllMomentsService } from "../../service/moments/get-all-moments-service";

export class GetAllMomentsController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { user } = request;

            if (!user) {
                return response.status(400).send({ message: "User does not exists" })
            }

            const allMoments = new GetAllMomentsService()
            const moments = await allMoments.execute({ user })

            response.status(200).send(moments)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}