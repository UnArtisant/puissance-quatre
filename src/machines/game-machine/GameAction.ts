import {GameAction, GameContext} from "./GameType";
import {freePostionY} from "../../func/game";

export const joinGameAction : GameAction<"join"> = (context, event) => ({
    players : [...context.players, {id : event.playerId, name : event.playerName}]
})

export const leaveGameAction : GameAction<"leave"> = (context, event) => {
    return {
        players: context.players.filter(p => p.id === event.playerId)
    }
}

export const dropTokenAction : GameAction<"dropToken"> = ({grid, players}, {x : eventX, playerId}) => {
    const eventY = freePostionY(grid,eventX)
    const playerColor = players.find(p => p.id === playerId)!.color!
    const newGrid = grid.map((row, y) => row.map((v, x) => x === eventX && y === eventY ? playerColor : v))

    return {
        grid : newGrid
    }
}

export const switchUserAction = (context : GameContext) => {
    return {
        currentPlayer : context.players.find(p => p.id !== context.currentPlayer)!.id
    }
}