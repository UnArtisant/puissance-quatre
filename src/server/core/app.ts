import Fastify, {FastifyInstance} from "fastify";
import {players} from "../routes/players";
import FastifyStatic from "@fastify/static"
import {resolve} from "path";


export const build = (opts = {}) => {

    const server: FastifyInstance = Fastify(opts)

    server.register(FastifyStatic, {
        root : resolve("./public")
    })

    server.register(players, {prefix : "api/players"});


    return server;
};