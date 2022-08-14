import React from 'react';
import ColorSelector from "../components/color-selector";
import {PlayersColors} from "../../lib/types/GameType";
import {useGame} from "../hooks/useGame";
import {prevent} from "../../lib/func/dom";
import LoginScreens from "./loginScreens";


type LobbyScreensProps = {}

function LobbyScreens({}: LobbyScreensProps) {
    const {send, context, can, state} = useGame()

    const selectColor = (color: PlayersColors) => send({
        type: "chooseColor",
        color,
    })
    const startGame = () => send({type: "start"})
    const canStart = can({type: "start"})

    if (!state) {
        return <div>
            <LoginScreens/>
        </div>
    }

    return (
        <div>

            <ColorSelector colors={[PlayersColors.RED, PlayersColors.YELLOW]}
                           onSelect={selectColor}
                           players={context!.players}/>
            <p>
                <button disabled={!canStart} onClick={prevent(startGame)}>Lancer la partie</button>
            </p>
        </div>
    );
}

export default LobbyScreens;