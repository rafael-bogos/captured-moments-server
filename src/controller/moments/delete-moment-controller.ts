import { FastifyReply, FastifyRequest } from "fastify";
import { AddRegisteredMomentService, ResisteredMomentsProps } from "../../service/moments/add-registered-moment-service";
import { DeleteMomentService } from "../../service/moments/delete-moment-service";

export class DeleteMomentController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { id } = request.params as { id: string }
            const { user } = request

            if (!user) {
                return response.status(400).send({ message: "User does not exists" })
            }

            if (!id) {
                return response.status(400).send({ message: "Image ID is required" })
            }

            const deleteMomentService = new DeleteMomentService()
            const deleteMoment = await deleteMomentService.execute({ id, user })

            response.status(200).send(deleteMoment)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}