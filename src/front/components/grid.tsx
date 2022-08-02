import React, {CSSProperties} from 'react';
import {GridState, PlayersColors} from "../../lib/types/GameType";
import Cell from "./cell";
import {Column} from "./column";

type GridProps = {
    grid: GridState,
    color ?: PlayersColors,
    onDrop ?: (x : number) => void
}

function Grid({grid, color, onDrop}: GridProps) {
    const cols = grid[0].length;
    const showColor = color && onDrop
    return (
        <div className="grid" style={
            {"--rows": grid.length, "--cols": cols} as CSSProperties
        }>
            {grid.map(
                (row, y) =>
                    row.map((c, x) =>
                        <Cell key={`${x}-{y}`} x={x} y={y} color={c}/>
                    ))
            }
            {showColor && <div className="columns">
                {new Array(cols).fill(1).map((_, k) => (
                    <Column onDrop={() => onDrop(k)} color={color} key={k} />
                ))}
            </div>}
        </div>
    );
}


export default Grid;