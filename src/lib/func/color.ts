import {PlayersColors} from "../types/GameType";

export const discColor = (color: string) => {
    if(color === "E") {
        return "disc"
    }
    return `disc ${color === PlayersColors.RED ? "disc-red" : "disc-yellow"}`
}