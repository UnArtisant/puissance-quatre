import React from 'react';
import Victory from "../components/victory";
import {useGame} from "../hooks/useGame";
import {currentPlayer} from "../../lib/func/game";

type VictoryScreensProps = {}

function VictoryScreens({} : VictoryScreensProps) {
    const {context, send} = useGame()
    const player = currentPlayer(context)
    const restart = () => send({type: "restart"})

    return (
        <div>
            <Victory color={player.color!} onRestart={restart} />
        </div>
    );
}

export default VictoryScreens;