import { prisma } from "../config/prisma"
import bcrypt from 'bcrypt'
import { AuthUtils } from "../utils/auth-utils";

interface userProps {
    email: string;
    password: string;
}

export class LoginUserService {
    async execute({ email, password }: userProps) {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid credentials")
        }

        const accessToken = AuthUtils.generateAccesToken(user.id)

        return {
            error: false,
            user: {
                fullName: user.fullName,
                email: user.email
            },
            accessToken,
            message: "Login successfully"
        }

    }
}