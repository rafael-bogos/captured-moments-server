import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateIsFavoriteService } from "../../service/moments/update-is-favorite-service";

export class UpdateIsFavoriteController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { id } = request.params as { id: string }
            const { user } = request
            const { isFavorite } = request.body as { isFavorite: boolean }

            if (!user) {
                return response.status(400).send({ message: "User does not exists" })
            }

            if (!id) {
                return response.status(400).send({ message: "Image ID is required" })
            }
            const updateIsFavoriteService = new UpdateIsFavoriteService()
            const updateMoment = await updateIsFavoriteService.execute({ id, isFavorite, user })

            response.status(200).send(updateMoment)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}