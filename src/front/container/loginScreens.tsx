import React from 'react';
import {PlayerSession} from "../../lib/types/GameType";
import {saveSession} from "../func/session";
import SelectName from "../components/select-name";

type LogingScreensProps = {}

export function LoginScreens({} : LogingScreensProps) {

    const joinGame = async (name: string) => {
        const data: PlayerSession = await fetch("/api/players", {method: "POST"}).then(r => r.json())
        const player = {
            ...data,
            name
        }
        saveSession(player)
        //send({type: "join", playerName: name, playerId: name})
    }

    return (
        <div>
            <SelectName onSelect={joinGame}/>
        </div>
    );
}

export default LoginScreens