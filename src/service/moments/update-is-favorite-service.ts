import { prisma } from "../../config/prisma";

export interface UpdateFavoriteProps {
    id: string;
    user: { userId: string };
    isFavorite: boolean;
}

export class UpdateIsFavoriteService {
    async execute({ id, isFavorite, user }: UpdateFavoriteProps) {
        const registerMoment = await prisma.moments.findFirst({
            where: {
                id,
                userId: user.userId
            }
        })

        if (!registerMoment) {
            throw new Error("Register moment not found")
        }

        const favoriteUpdate = await prisma.moments.update({
            where: {
                id
            },
            data: {
                isFavorite
            }
        })

        return {favoriteUpdate}
    }
}