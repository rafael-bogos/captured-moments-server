import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteFileService } from "../../service/upload/delete-file-service";

export class DeleteFileController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const imageUrl = request.query as { imageUrl: string };
            if (!imageUrl) {
                response.status(400).send({ message: "ImageUrl parameter is required" })
            }

            const deleteFileService = new DeleteFileService()
            const deleted = await deleteFileService.execute(imageUrl)

            response.status(200).send(deleted)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}