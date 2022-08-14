import {ContextFrom, EventFrom} from "xstate";
import {GameModel} from "../../machines/game-machine/GameMachine";

export enum PlayersColors {
    RED = "R",
    YELLOW = "Y"
}

export enum GameState {
    LOBBY = "LOBBY",
    PLAY = "PLAY",
    WIN = "WIN",
    TIGHT = "TIGHT"
}

export type Player = {
    id: string,
    name: string,
    color?: PlayersColors
}

export type PlayerSession = {
    id: string,
    name: string,
    signature: string,
}

export enum QueryParams  {
    GAMEID = "gameId"
}

export type CellEmpty = "E"
export type CellState = PlayersColors.RED | PlayersColors.YELLOW | CellEmpty | "R" | "Y"
export type GridState = CellState[][]
export type GameContext = ContextFrom<typeof GameModel>
export type GameEvents = EventFrom<typeof GameModel>
export type GameEvent<T extends GameEvents["type"]> = GameEvents & { type: T }
export type GameGuard<T extends GameEvents["type"]> = (
    context: GameContext,
    event: GameEvent<T>
) => boolean
export type GameAction<T extends GameEvents["type"]> = (
    context: GameContext,
    event: GameEvent<T>
) => Partial<GameContext>