import { prisma } from "../config/prisma"
import bcrypt from 'bcrypt'
import { AuthUtils } from "../utils/auth-utils";

interface userProps {
    email: string;
    password: string;
    fullName: string;
}

export class CreateUserService {
    async execute({ email, password, fullName }: userProps) {
        const existingUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (existingUser) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        })

        const accessToken = AuthUtils.generateAccesToken(user.id)

        return {
            error: false,
            user: {
                fullName: fullName,
                email: email
            },
            accessToken,
            message: "Registered successfully"
        }
    }
}