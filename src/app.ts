import fastify from "fastify";
import { router } from "./routes";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from '@fastify/cors'

export const app = fastify({ logger: true })

app.register(cors, {
    origin: ["http://localhost:3000"], // libera o front local
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

app.register(fastifyStatic, {
    root: path.join(__dirname, '../uploads'),
    prefix: '/uploads/',
})
app.register(fastifyMultipart)
app.register(router)
