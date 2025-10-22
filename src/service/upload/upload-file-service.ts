export class UploadFileService {
    async execute({ file }: { file: any }) {
        try {
            const imageUrl = `${process.env.APPLICATION_BASE_URL}/uploads/${file.filename}`
            return imageUrl
        } catch (error) {
            console.error("Error: ", error)
            throw new Error("Error while processing upload")
        }
    }
}