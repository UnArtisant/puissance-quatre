import {PlayersColors} from "../../lib/types/GameType";
import {prevent} from "../../lib/func/dom";
import {discColor} from "../../lib/func/color";
import React from "react";

type ColumnsProps = {
    color: PlayersColors,
    onDrop : () => void
}

export const Column = ({color, onDrop}: ColumnsProps) => {
    return <div onClick={prevent(onDrop)} className={"column"} >
        <div className={discColor(color)}/>
    </div>
}