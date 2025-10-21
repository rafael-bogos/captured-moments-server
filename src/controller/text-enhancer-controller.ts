import { FastifyReply, FastifyRequest } from "fastify"
import { TextEnhancerService } from "../service/text-enhancer-service";

export class TextEnhancerController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { text } = request.body as { text: string };

        try {
            const textEnhancerService = new TextEnhancerService()
            const textEnhancer = await textEnhancerService.execute({ text })

            response.status(200).send(textEnhancer)
        } catch (error: any) {
            response.status(500).send({ error: true, message: error.message })
        }
    }
}