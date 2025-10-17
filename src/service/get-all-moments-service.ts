import { prisma } from "../config/prisma";

export class GetAllMomentsService {
    async execute({ user }: { user: { userId: string } }) {
        const allMoments = await prisma.moments.findMany({
            where: {
                userId: user.userId
            },
            orderBy: {
                isFavorite: "desc"
            }
        })

        if (!allMoments.length) {
            return { error: false, moments: {}, message: "No moments to list" }
        }

        return { error: false, moments: allMoments, message: "Successfully found moments" }
    }
}