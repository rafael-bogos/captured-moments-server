import { prisma } from "../../config/prisma";

export interface DateFilterProps {
    startDate: string;
    endDate: string;
    user: { userId: string };

}

export class DateFilterMomentService {
    async execute({ endDate, startDate, user }: DateFilterProps) {
        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

        return await prisma.moments.findMany({
            where: {
                userId: user.userId,
                visitedDate: {
                    gte: start,
                    lte: end
                }
            },
            orderBy: {
                isFavorite: 'desc'
            }
        })
    }
}