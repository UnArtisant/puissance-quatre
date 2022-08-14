import Fastify, {FastifyInstance} from "fastify";
import {players} from "../routes/players";
import FastifyStatic from "@fastify/static"
import FastifyWebsocket from "@fastify/websocket"
import {resolve} from "path";
import {websocket} from "../routes/websocket";


export const build = (opts = {}) => {

    const server: FastifyInstance = Fastify(opts)

    server.register(FastifyStatic, {
        root : resolve("./public")
    })

    server.register(FastifyWebsocket)

    server.register(websocket, {prefix : "ws"})

    server.register(players, {prefix : "api/players"});


    return server;
};