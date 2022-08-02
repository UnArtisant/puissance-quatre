import React from 'react';
import SelectName from "../components/select-name";
import ColorSelector from "../components/color-selector";
import {PlayersColors} from "../../lib/types/GameType";
import {useGame} from "../hooks/useGame";
import {prevent} from "../../lib/func/dom";

type LobbyScreensProps = {}

function LobbyScreens({}: LobbyScreensProps) {
    const {send, context, can} = useGame()

    const joinGame = (name: string) => send({type: "join", playerName: name, playerId: name})
    const selectColor = (color: PlayersColors) => send({type: "chooseColor", color, playerId : color === PlayersColors.RED ? "john" : "marc"})
    const startGame = () => send({type: "start"})
    const canStart = can({type: "start"})

    return (
        <div>
            <SelectName onSelect={joinGame}/>
            <hr/>
            <ColorSelector colors={[PlayersColors.RED, PlayersColors.YELLOW]}
                           onSelect={selectColor}
                           players={context.players}/>
            <p>
                <button disabled={!canStart} onClick={prevent(startGame)}>Lancer la partie</button>
            </p>
        </div>
    );
}

export default LobbyScreens;