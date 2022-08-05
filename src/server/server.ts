import { FastifyInstance} from 'fastify'
import {build} from "./core/app";


const server: FastifyInstance =  build({
    logger: true,
});

const start = async () => {
    try {
        await server.listen({ port: 3000 })
        server.log.info("server launch on port 3000...")

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()