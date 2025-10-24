import path from "path";
import fs from 'fs'

export class DeleteFileService {
    async execute({ imageUrl }: { imageUrl: string }) {
        const fileName = path.basename(imageUrl);
        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', fileName)

        if (fileName === 'image-default.png') {
            return { message: 'Image default has been preserved' }
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            return { message: "Image deleted successfuly" }
        } else {
            return { error: true, message: "Image not found" }
        }

    }
}