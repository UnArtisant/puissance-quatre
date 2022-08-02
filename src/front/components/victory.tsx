import React from 'react';
import {discColor} from "../../lib/func/color";
import {PlayersColors} from "../../lib/types/GameType";
import {prevent} from "../../lib/func/dom";

type VictoryProps = {
    color: PlayersColors,
    onRestart: () => void
};

function Victory({color, onRestart}: VictoryProps) {
    return (
        <div className="flex" style={{justifyContent: "space-between"}}>
            <h2 className="flex" style={{gap: ".7rem"}}>
                Le joueur a gagné <div className={discColor(color)}/>
            </h2>
            <button onClick={prevent(onRestart)}>rejouer</button>
        </div>
    );
}

export default Victory;