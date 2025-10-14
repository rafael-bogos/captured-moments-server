import { prisma } from "../prisma/prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "72h" })

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