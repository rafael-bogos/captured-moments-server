import { prisma } from "../prisma/prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        console
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        })

        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "72h" })

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