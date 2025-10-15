import { prisma } from "../prisma/prisma"

interface userProps {
    user: {
        userId: string
    }
}

export class GetUserService {
    async execute({ user }: userProps) {
        const existingUser = await prisma.user.findFirst({
            where: {
                id: user.userId
            }
        })

        if (!existingUser) {
            throw new Error("User not found")
        }

        return { error: false, user: existingUser, message: "User found" }
    }
}