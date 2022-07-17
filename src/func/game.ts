import {CellEmpty, GameContext, GridState, Player, PlayersColors} from "../machines/game-machine/GameType";

export function freePostionY(grid: GridState, x: number): number {
    const yLenght: number = grid.length - 1
    for (let i = yLenght; i >= 0; i--) {
        if (grid[i][x] === "E") {
            return i
        }
    }

    return -1
}

export function winningPostion(grid: GridState, x: number, color: PlayersColors, size: number) {
    const directions = [
        [1, 0],
        [0, 1],
        [1, 1],
        [1, -1],
    ]

    const position = {x, y: freePostionY(grid, x)}

    for (let direction of directions) {
        let items = [position]
        for (let forward of [-1, 1]) {
            for (let i = 1; i < size; i++) {
                const y = position.y + (i * direction[1] * forward)
                const x = position.x + (i * direction[0] * forward)
                if (grid?.[y]?.[x] !== color) {
                    break
                }
                items.push({x, y})
            }
        }
        if (items.length >= size) {
            return items
        }
    }

    return []
}

export function currentPlayer (context: GameContext) : Player {
    const player = context.players.find(p => p.id === context.currentPlayer)
    if(player === undefined) {
        throw new Error("no player found")
    }
    return player
}

export function countEmptyCell(grid: GridState) {
    let count = 0;

    for (let row of grid) {
        for(let val of row) {
            if(val === "E") {
                count++
            }
        }
    }

    return count
}