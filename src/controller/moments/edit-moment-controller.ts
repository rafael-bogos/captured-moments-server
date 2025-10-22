import { FastifyReply, FastifyRequest } from "fastify";
import { ResisteredMomentsProps } from "../../service/moments/add-registered-moment-service";
import { EditMomentService } from "../../service/moments/edit-moment-service";

export class EditMomentController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { title, story, visitedLocation, imageUrl, visitedDate } = request.body as ResisteredMomentsProps;
            const { user } = request;
            const { id } = request.params as { id: string }

            if (!title || !story || !visitedLocation || !visitedDate) {
                return response.status(400).send({ message: "All fields are required" })
            }

            if (!user) {
                return response.status(400).send({ message: "User does not exists" })
            }

            const updateMomentService = new EditMomentService()
            const updateMoment = await updateMomentService.execute({ id, imageUrl, story, title, user, visitedDate, visitedLocation })

            response.status(200).send(updateMoment)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}