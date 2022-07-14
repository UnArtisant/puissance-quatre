import {createMachine} from "xstate";
import {createModel} from "xstate/lib/model";
import {GridState, Player} from "../types/Game";

enum GameState {
    LOBBY = "LOBBY",
    PLAY = "PLAY",
    WIN = "WIN",
    TIGHT = "TIGHT"
}

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
})

export const GameMachine = createMachine({
    id: "game",
    initial : GameState.LOBBY,
    states : {
        [GameState.LOBBY] : {
            on : {
                join : {
                    target : GameState.LOBBY
                },
                leave: {
                    target : GameState.LOBBY
                },
                chooseColor : {
                    target : GameState.LOBBY
                },
                start : {
                    target : GameState.PLAY
                }
            }
        },
        [GameState.PLAY] : {
            on : {
                dropToken : {
                    target : "???"
                }
            }
        },
        [GameState.WIN] : {
            on : {
                restart : {
                    target : GameState.LOBBY
                }
            }
        },
        [GameState.TIGHT] : {
            on : {
                restart : {
                    target : GameState.LOBBY
                }
            }
        }

    }
})