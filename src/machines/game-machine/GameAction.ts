import {GameAction, GameContext} from "../../lib/types/GameType";
import {freePostionY} from "../../lib/func/game";
import {GameModel} from "./GameMachine";

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

export const restartAction : GameAction<"restart"> = () => ({
    grid : GameModel.initialContext.grid,
    currentPlayer: null,
})

export const setCurrentPlayerAction = (context : GameContext) => {
    return {
        currentPlayer: context.players[0]!.id
    }
}

export const chooseColorAction : GameAction<"chooseColor"> = ({players} , {playerId, color}) => {
    return {
        players: players.map(player => (player.id === playerId ? {...player, color} : player))
    }
}