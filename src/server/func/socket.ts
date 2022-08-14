import {ConnectionService} from "../services/ConnectionService";
import {InterpreterFrom} from "xstate";
import {GameMachine} from "../../machines/game-machine/GameMachine";
import {SocketStream} from "@fastify/websocket";

export function publishMachineToPlayer(
    machine: InterpreterFrom<typeof GameMachine>["state"],
    connections: ConnectionService,
    gameId: string
) {
    for (const player of machine.context.players) {
        const connection = connections.find(player.id, gameId)
        if (connection) {
            publishMachine(machine, connection)
        }
    }
}

export function publishMachine(
    machine: InterpreterFrom<typeof GameMachine>["state"],
    connection: SocketStream
) {
    connection.socket.send(JSON.stringify({
        type: "gameUpdate",
        state: machine.value,
        context: machine.context
    }))
}