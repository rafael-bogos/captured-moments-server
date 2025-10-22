import { FastifyReply, FastifyRequest } from "fastify";
import { UploadFileService } from "../../service/upload/upload-file-service";

export class UploadFileController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const file = (request as any).file;
            console.log("FILE: ", file)
            if (!file.filename) {
                response.status(400).send({ message: "No file uploaded" })
            }

            const uploadFileService = new UploadFileService()
            const uploadFile = await uploadFileService.execute({ file })

            response.status(201).send(uploadFile)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}