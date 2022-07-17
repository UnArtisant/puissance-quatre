import {beforeEach, describe, expect, it} from "vitest";
import {GameMachine, GameModel, makeGame} from "../../src/machines/game-machine/GameMachine";
import {interpret, InterpreterFrom} from "xstate";
import {GameContext, GameState, PlayersColors} from "../../src/machines/game-machine/GameType";
import {canDropToken} from "../../src/machines/game-machine/GameGuard";

describe("machine/guard", () => {
    describe("join", () => {
        let machine: InterpreterFrom<typeof GameMachine>

        beforeEach(() => {
            machine = interpret(GameMachine).start()
        })

        it("should let the user join", () => {
            expect(machine.send(GameModel.events.join("1", "1")).changed).toBe(true)
        })
    })

    describe("leave", () => {

        let machine: InterpreterFrom<typeof GameMachine>

        beforeEach(() => {
            machine = interpret(GameMachine).start()
        })


        it("should make user leave", () => {
            machine.send(GameModel.events.join("1", "1"))
            machine.send(GameModel.events.join("2", "2"))

            expect(machine.send(GameModel.events.leave("2")).changed).toBe(true)
            expect(machine.state.context.players).toHaveLength(1)
        })

        it("user can't leave if not in the game", () => {
            machine.send(GameModel.events.join("1", "1"))

            expect(machine.send(GameModel.events.leave("2")).changed).toBe(false)
        })

    })

    describe("drop token", () => {
        let machine : InterpreterFrom<typeof GameMachine>;
       beforeEach(() => {
           machine = makeGame(GameState.PLAY, {
               players: [
                   {id: "1", color : PlayersColors.RED, name: "1"},
                   {id: "2", color: PlayersColors.YELLOW, name: "2"}
               ],
               currentPlayer: "1",
               grid: [
                   ["E", "E","E","E","E","E","Y"],
                   ["E", "E","E","E","E","R","R"],
                   ["E", "E","E","E","E","R","Y"],
                   ["E", "E","E","E","E","R","R"],
                   ["E", "E","E","E","E","Y","Y"],
                   ["E", "E","E","E","E","Y","R"]
               ]
           })
       })


        it("it sould let me drop a token", () => {
            expect(machine.send(GameModel.events.dropToken("1", 5)).changed).toBe(true)
            expect(machine.state.context.grid[0][5]).toBe(PlayersColors.RED)
            expect(machine.state.context.currentPlayer).toBe("2")
            expect(machine.state.value).toBe(GameState.WIN)
        })

        it("it souldn't let me drop a token", () => {
            expect(machine.send(GameModel.events.dropToken("1", 6)).changed).toBe(false)
            expect(machine.state.context.grid[0][6]).toBe(PlayersColors.YELLOW)
        })
    })
})