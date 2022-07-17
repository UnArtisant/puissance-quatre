import {GameGuard, PlayersColors} from "./GameType";
import {countEmptyCell, currentPlayer, freePostionY, winningPostion} from "../../func/game";

export const canJoinGuard: GameGuard<"join"> = (context, event) => {
    return context.players.length < 2 && context.players.find(p => p.id === event.playerId) === undefined
}

export const canLeaveGuard: GameGuard<"leave"> = (context, event) => {
    return context.players.find(p => p.id === event.playerId) !== undefined
}

export const canChooseColor: GameGuard<"chooseColor"> = (context, event) => {
    return context.players.find(p => p.id === event.playerId) !== undefined
        && context.players.find(p => p.color === event.color) === undefined
        && [PlayersColors.RED, PlayersColors.YELLOW].includes(event.color!)
}

export const canStartGame: GameGuard<"start"> = (context, event) => {
    return context.players.filter(p => p.color).length === 2
}

export const canDropToken: GameGuard<"dropToken"> = (context, event) => {
    return event.x >= 0
        && event.playerId === context.currentPlayer
        && event.x <= context.grid[0].length
        && freePostionY(context.grid, event.x) >= 0
}

export const isWinningGuard: GameGuard<"dropToken"> = (context, event) => {
  return canDropToken(context, event) && winningPostion(context.grid, event.x, currentPlayer(context).color!,context.rowLength).length > 0
}

export const isTight: GameGuard<"dropToken"> = (context, event) => {
    return canDropToken(context, event) && countEmptyCell(context.grid) <= 1
}