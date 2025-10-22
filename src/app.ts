import fastify from "fastify";
import { router } from "./routes";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

export const app = fastify({ logger: true })

app.register(fastifyStatic, {
    root: path.join(__dirname, '../uploads'),
    prefix: '/uploads/', 
})

app.register(fastifyMultipart)
app.register(router)

