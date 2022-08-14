import {FastifyInstance} from "fastify";
import {verify} from "../func/crypto";
import {ServerErrors} from "../../lib/types/ErrorsType";
import {ConnectionService} from "../services/ConnectionService";
import {GameService} from "../services/GameService";
import {GameModel} from "../../machines/game-machine/GameMachine";
import {publishMachine} from "../func/socket";

const connections = new ConnectionService()
const games = new GameService(connections)

export const websocket = (server: FastifyInstance, _: any, done: () => void): void => {

    server.get("/", {websocket: true}, (connection, req) => {

        const query = req.query as Record<string, string>

        const playerId = query.id || ''
        const name = query.name || ''
        const gameId = query.gameId
        const signature = query.signature

        if (!gameId) {
            connection.end()
            server.log.error("no game id")
            return;
        }

        if (!verify(playerId, signature)) {
            server.log.error("auth error")
            connection.socket.send(JSON.stringify(
                {
                    type: "error", code: ServerErrors.AuthError
                }
            ))
            return;
        }

        const game = games.find(gameId) ?? games.create(gameId)
        connections.persist(playerId, gameId, connection)
        game.send(GameModel.events.join(playerId, name))
        publishMachine(game.state, connection)


        connection.socket.on("close", () => {
            connections.remove(playerId, gameId)
            game.send(GameModel.events.leave(playerId))
            games.clear(gameId)
        })

        connection.socket.on("message", (message) => {
            const msg = JSON.parse(message.toLocaleString())
            if(msg.type === "gameUpdate") {
                game.send(msg.event)
            }
        })
    });

    done()
}