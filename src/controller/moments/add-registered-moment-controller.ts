import { FastifyReply, FastifyRequest } from "fastify";
import { AddRegisteredMomentService, ResisteredMomentsProps } from "../../service/moments/add-registered-moment-service";

export class AddRegisteredMomentController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { title, story, visitedLocation, imageUrl, visitedDate } = request.body as ResisteredMomentsProps;
            const { user } = request;

            if (!title || !story || !visitedLocation || !visitedDate) {
                return response.status(400).send({ message: "All fields are required" })
            }

            if (!user) {
                return response.status(400).send({ message: "User does not exists" })
            }

            const addMomentsService = new AddRegisteredMomentService()
            const addMoments = await addMomentsService.execute({ imageUrl, story, title, user, visitedDate, visitedLocation })

            response.status(201).send(addMoments)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}