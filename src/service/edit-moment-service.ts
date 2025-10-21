import { prisma } from "../config/prisma";

export interface UpdateMomentProps {
    id: string;
    title: string;
    story: string;
    visitedLocation: string[];
    imageUrl?: string;
    visitedDate: string;
    user: { userId: string },
}

export class EditMomentService {
    async execute({ imageUrl, story, title, user, visitedDate, visitedLocation, id }: UpdateMomentProps) {

        const registeredMoment = await prisma.moments.findFirst({
            where: {
                id,
                userId: user.userId
            }
        })

        if (!registeredMoment) {
            throw new Error("Register moment not found")
        }
        
        const placeholderImageUrl = `${process.env.APPLICATION_BASE_URL}/uploads/imagem-fallback.png`
        const parsedVisitedDate = new Date(parseInt(visitedDate))

        const result = await prisma.moments.update({
            where: {
                id
            },
            data: {
                imageUrl: imageUrl || placeholderImageUrl,
                story: story,
                title: title,
                visitedDate: parsedVisitedDate,
                visitedLocation: visitedLocation,
                userId: user.userId

            }
        })

        return { error: false, moment: result, message: "Update successfully" }
    }
}