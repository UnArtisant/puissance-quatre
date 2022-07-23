import React, {CSSProperties} from 'react';
import {CellState} from "../../lib/types/GameType";
import {discColor} from "../../lib/func/color";

type CellProps = {
    x : number,
    y : number,
    color : CellState
}

function Cell({x, y, color} : CellProps) {
    return (
        <div style={{"--row" : y} as CSSProperties} className={discColor(color)}/>
    );
}

export default Cell;