import { app } from "./app";

const PORT = Number(process.env.PORT) || 3000;
app.listen({ port: PORT });
console.log(`Servidor rodando na porta ${PORT} 🚀`);

