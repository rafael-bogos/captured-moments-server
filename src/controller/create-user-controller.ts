import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserService } from "../service/create-user-service"

export class CreateUserController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { fullName, email, password } = request.body as { fullName: string, email: string, password: string }

        if (!fullName || !email || !password) {
            response.status(400).send({ message: "Todos os campos são requiridos" })
        }

        try {
            const createUserService = new CreateUserService()
            const user = await createUserService.execute({email, fullName, password})

            response.send(user)

        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({error: true, message: error.message})
        }
    }
}