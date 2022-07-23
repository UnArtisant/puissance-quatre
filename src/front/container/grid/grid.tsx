import React, {CSSProperties} from 'react';
import {GridState} from "../../../lib/types/GameType";
import Cell from "../../components/cell";

type GridProps = {
    grid: GridState
}

function Grid({grid}: GridProps) {
    return (
        <div className="grid" style={
            {"--rows": grid.length, "--cols": grid[0].length} as CSSProperties
        }>
            {grid.map(
                (row, y) =>
                    row.map((c, x) =>
                        <Cell key={`${x}-{y}`} x={x} y={y} color={c}/>
                    ))
            }
        </div>
    );
}

export default Grid;