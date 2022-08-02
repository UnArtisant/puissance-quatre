import React from 'react';
import Play from "../components/play";
import {useGame} from "../hooks/useGame";
import {currentPlayer} from "../../lib/func/game";

type PlayscreensProps = {

}

function PlayScreens({} : PlayscreensProps) {

    const {context} = useGame()
    const player = currentPlayer(context)

    return (
        <div>
            <Play color={player.color!} />
        </div>
    );
}

export default PlayScreens;