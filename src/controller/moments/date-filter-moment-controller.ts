import { FastifyReply, FastifyRequest } from "fastify";
import { DateFilterMomentService } from "../../service/moments/date-filter-moment-service";

export class DateFilterMomentController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const { startDate, endDate } = request.query as { startDate: string, endDate: string }
            const { user } = request;

            if (!user) {
                return response.status(400).send({ error: true, message: "User is required" })
            }

            const dateFilterMomentService = new DateFilterMomentService()
            const dateFiltered = await dateFilterMomentService.execute({ endDate, startDate, user })

            response.status(200).send(dateFiltered)
        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}