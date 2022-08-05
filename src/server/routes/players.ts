import { FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {v4} from "uuid";
import {sign} from "../func/crypto";


const getSignature = (req: FastifyRequest, res: FastifyReply) => {
    const playerId = v4()
    const signature = sign(playerId)
    res.send({
        id: playerId,
        signature
    })
}

export const players = (server: FastifyInstance, _: any, done: () => void): void => {
    server.post("/", getSignature);

    done()
}