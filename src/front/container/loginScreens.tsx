import React from 'react';
import {PlayerSession, QueryParams} from "../../lib/types/GameType";
import {saveSession} from "../func/session";
import SelectName from "../components/select-name";
import {useGame} from "../hooks/useGame";
import {updateUrlParams, urlParams} from "../func/url";
import {v4} from "uuid";

type LogingScreensProps = {}

export function LoginScreens({}: LogingScreensProps) {

    const {connect} = useGame()

    const joinGame = async (name: string) => {
        const data: PlayerSession = await fetch("/api/players", {method: "POST"}).then(r => r.json())
        const player = {
            ...data,
            name
        }
        saveSession(player)
        const gameId = urlParams().get(QueryParams.GAMEID) ?? v4()
        connect(player, gameId)
        updateUrlParams({[QueryParams.GAMEID]: gameId})
    }

    return (
        <div>
            <SelectName onSelect={joinGame}/>
        </div>
    );
}

export default LoginScreens