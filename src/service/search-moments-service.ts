import { prisma } from "../config/prisma"

interface SearchMomentsProps {
    query: string;
    user: {
        userId: string
    }
}

export class SearchMomentsService {
    async execute({ query, user }: SearchMomentsProps) {
        const searchResult = await prisma.moments.findMany({
            where: {
                userId: user.userId,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { story: { contains: query, mode: 'insensitive' } },
                    { visitedLocation: { hasSome: [query] } }
                ]
            }
        })

        if (!searchResult.length) {
            return { error: false, moments: {}, message: "No moments" }
        }

        return { error: false, moments: searchResult, message: "User found" }
    }
}