import axios from "axios"

export class TextEnhancerService {
    async execute({ text }: { text: string }) {
        const prompt = `Você é um assistente especializado em aprimorar textos. Sua única tarefa é melhorar e intensificar o texto fornecido, mantendo o significado original.

                        REGRAS IMPORTANTES:
                        - Mantenha o idioma original do texto
                        - Preserve a mensagem e intenção original
                        - Torne o texto mais claro, impactante e bem escrito
                        - Melhore a gramática, vocabulário e fluidez
                        - NÃO adicione explicações, comentários ou observações extras
                        - Retorne APENAS o texto aprimorado, nada mais

                        TEXTO ORIGINAL:
                        ${text}

                        TEXTO APRIMORADO:`

        const result = await axios.post(`http://localhost:11434/api/generate`, {
            "model": "llama3.2",
            "prompt": prompt,
            "stream": false
        })

        return { message: result.data.response.trim() }
    }
}