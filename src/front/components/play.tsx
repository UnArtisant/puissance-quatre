import React from 'react';
import {PlayersColors} from "../../lib/types/GameType";
import {discColor} from "../../lib/func/color";

type PlayProps = {
    color : PlayersColors
}

function Play({color} : PlayProps) {
    return (
        <div>
            <h2 className="flex" style={{gap : ".7rem"}}>
                c'est au tour du joueur <div className={discColor(color)} /> de jouer
            </h2>
        </div>
    );
}

export default Play;