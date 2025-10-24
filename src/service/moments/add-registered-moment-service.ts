import { prisma } from "../../config/prisma";

export interface ResisteredMomentsProps {
    title: string;
    story: string;
    visitedLocation: string[];
    imageUrl: string;
    visitedDate: string;
    user: { userId: string }
}

export class AddRegisteredMomentService {
    async execute({ imageUrl, story, title, user, visitedDate, visitedLocation }: ResisteredMomentsProps) {
        const parsedVisitedDate = new Date(visitedDate)
        const placeholderImageUrl = `${process.env.APPLICATION_BASE_URL}/uploads/image-default.png`

        const result = await prisma.moments.create({
            data: {
                imageUrl: imageUrl || placeholderImageUrl,
                story: story,
                title: title,
                visitedDate: parsedVisitedDate,
                visitedLocation: visitedLocation,
                userId: user.userId

            }
        })

        return { error: false, moment: result, message: "Moment registered successfully" }
    }
}