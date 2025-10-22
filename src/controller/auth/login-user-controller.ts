import { FastifyReply, FastifyRequest } from "fastify"
import { LoginUserService } from "../../service/auth/login-user-service"

export class LoginUserController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const { email, password } = request.body as { email: string, password: string }

        if (!email || !password) {
            return response.status(400).send({ message: "All fields are required" })
        }
        try {
            const loginUserService = new LoginUserService()
            const user = await loginUserService.execute({ email, password })

            response.send(user)

        } catch (error: any) {
            console.error("Error: ", error)
            response.status(400).send({ error: true, message: error.message })
        }
    }
}