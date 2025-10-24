import path from "path";
import fs from 'fs'
import { prisma } from "../../config/prisma";

export interface UserProps {
    user: {
        userId: string
    }
}

type DeleteMomentsProps = UserProps & { id: string }

export class DeleteMomentService {
    async execute({ id, user }: DeleteMomentsProps) {

        const registerMoment = await prisma.moments.findFirst({
            where: {
                id,
                userId: user.userId
            }
        })

        if (!registerMoment) {
            throw new Error("Register Moment not found")
        }

        await prisma.moments.delete({
            where: {
                id,
                userId: user.userId
            }
        })

        const imageUrl = registerMoment.imageUrl
        const fileName = path.basename(imageUrl);

        // Não deleta imagem default!
        if (fileName === 'image-default.png') {
            return { message: 'Image default has been preserved' }
        }

        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Falid to delete image file: ", err)
            }
        })

        return { message: "Register moments deleted successefuly" }
    }
}