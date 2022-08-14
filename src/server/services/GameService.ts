import {ConnectionService} from "./ConnectionService";
import {interpret, InterpreterFrom} from "xstate";
import {GameMachine} from "../../machines/game-machine/GameMachine";
import {publishMachineToPlayer} from "../func/socket";

type Machine = InterpreterFrom<typeof GameMachine>

export class GameService {
    constructor(
        private connections: ConnectionService,
        private games = new Map<string, Machine>
    ) {
    }

    create(gameId: string): Machine {
        const game = interpret(GameMachine)
            .onTransition(state => {
                publishMachineToPlayer(state, this.connections, gameId)
            })
            .start()
        this.games.set(gameId, game)
        return game
    }

    find(gameId: string): Machine | undefined {
        return this.games.get(gameId)
    }

    clear(gameId: string): void {
        const game = this.games.get(gameId)
        if (game && game.state.context.players.filter(p => this.connections.has(p.id, gameId)).length === 0) {
            this.games.delete(gameId)
        }
    }
}