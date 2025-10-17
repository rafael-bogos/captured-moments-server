import { prisma } from "../config/prisma";

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

        const parsedVisitedDate = new Date(parseInt(visitedDate))

        const result = await prisma.moments.create({
            data: {
                imageUrl: imageUrl,
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