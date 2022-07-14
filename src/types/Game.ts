import {ContextFrom} from "xstate";
import {GameModel} from "../machines/GameMachine";

export enum PlayersColors {
    RED = "RED",
    YELLOW = "YELLOW"
}

export type Player = {
    id: string,
    name: string,
    color?: PlayersColors
}

export type CellEmpty = "E"
export type CellState = PlayersColors.RED | PlayersColors.YELLOW | CellEmpty
export type GridState = CellState[][]
export type GameContext = ContextFrom<typeof GameModel>