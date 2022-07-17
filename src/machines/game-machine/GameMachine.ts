import {createModel} from "xstate/lib/model";
import {GameContext, GridState, Player, GameState} from "./GameType";
import {
    canChooseColor,
    canDropToken,
    canJoinGuard,
    canLeaveGuard,
    canStartGame,
    isTight,
    isWinningGuard
} from "./GameGuard";
import {
    chooseColorAction,
    dropTokenAction,
    joinGameAction,
    leaveGameAction,
    restartAction,
    setCurrentPlayerAction,
    switchUserAction
} from "./GameAction";
import {interpret} from "xstate";


export const GameModel = createModel({
    players : [] as Player[],
    currentPlayer : null as null | Player["id"],
    rowLength : 4
,    grid : [
        ["E", "E","E","E","E","E","E"],
        ["E", "E","E","E","E","E","E"],
        ["E", "E","E","E","E","E","E"],
        ["E", "E","E","E","E","E","E"],
        ["E", "E","E","E","E","E","E"],
        ["E", "E","E","E","E","E","E"]
    ] as GridState
}, {
    events : {
        join : (playerId : Player["id"], playerName : Player["name"]) => ({playerId, playerName}),
        leave : (playerId : Player["id"]) => ({playerId}),
        chooseColor : (playerId : Player["id"], color : Player["color"]) => ({playerId, color}),
        dropToken : (playerId: Player["id"], x : number) => ({playerId, x}),
        start : () => ({}),
        restart : () => ({})
    }
})



export const GameMachine = GameModel.createMachine({
    id: "game",
    context : GameModel.initialContext,
    initial : GameState.LOBBY,
    states : {
        [GameState.LOBBY] : {
            on : {
                join : {
                    cond: canJoinGuard,
                    target : GameState.LOBBY,
                    actions : [GameModel.assign(joinGameAction)]
                },
                leave: {
                    cond: canLeaveGuard,
                    target : GameState.LOBBY,
                    actions : [GameModel.assign(leaveGameAction)]
                },
                chooseColor : {
                    cond: canChooseColor,
                    target : GameState.LOBBY,
                    actions: [GameModel.assign(chooseColorAction)]
                },
                start : {
                    cond: canStartGame,
                    target : GameState.PLAY,
                    actions: [GameModel.assign(setCurrentPlayerAction)]
                }
            }
        },
        [GameState.PLAY] : {
            on : {
                dropToken : [
                    {
                        cond : isTight,
                        target : GameState.TIGHT,
                        actions : [
                            GameModel.assign(dropTokenAction),
                        ]
                    },
                    {
                        cond : isWinningGuard,
                        target : GameState.WIN,
                        actions : [
                            GameModel.assign(dropTokenAction),
                        ]
                    },
                    {
                        cond : canDropToken,
                        target : GameState.PLAY,
                        actions : [
                            GameModel.assign(dropTokenAction),
                            GameModel.assign(switchUserAction)
                        ]
                    },
                ]
            }
        },
        [GameState.WIN] : {
            on : {
                restart : {
                    target : GameState.LOBBY,
                    actions: [GameModel.assign(restartAction)]
                }
            }
        },
        [GameState.TIGHT] : {
            on : {
                restart : {
                    target : GameState.LOBBY,
                    actions: [GameModel.assign(restartAction)]
                }
            }
        }

    }
})

export const makeGame = (state : GameState = GameState.LOBBY, context: Partial<GameContext>) => {
   const machine = interpret(GameMachine.withContext({
       ...GameModel.initialContext,
       ...context
   }).withConfig({
       ...GameMachine.config,
       initial : state
   } as any)).start()

    machine.state.value = state
    return machine
}