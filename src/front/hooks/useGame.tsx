import {
    GameContext,
    GameEvent,
    GameEvents,
    GameState,
    Player,
    PlayerSession,
    QueryParams
} from "../../lib/types/GameType";
import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {GameMachine, makeGame} from "../../machines/game-machine/GameMachine";
import ReconnectingWebSocket from "reconnecting-websocket";
import {getSession, logout} from "../func/session";
import {urlParams} from "../func/url";
import {InterpreterFrom} from "xstate";
import {ServerErrors} from "../../lib/types/ErrorsType";

export type GameContextType = {
    playerId : Player['id'],
    can: <T extends GameEvents["type"]>(event : {type : T} & Omit<GameEvent<T>, "playerId">) => boolean,
    send: <T extends GameEvents["type"]>(event: {type : T} & Omit<GameEvent<T>, "playerId">) => void,
    connect : (session : PlayerSession, gameId : string) => void,
    context?: GameContext,
    state: GameState | null
}

const Context = createContext<GameContextType>({} as any)

export function useGame () {
    return useContext(Context)
}


export const GameContextProvider = ({children}: PropsWithChildren) => {
    const [machine, setMachine] = useState<InterpreterFrom<typeof GameMachine> | null>(null)
    const [playerId, setPlayerId] = useState<string>("")
    const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null)

    const connect = (session : PlayerSession, gameId : string) => {
        const params = new URLSearchParams({
            ...session,
            gameId
        })
        setPlayerId(session.id)
        const socket = new ReconnectingWebSocket(
            `${window.location.protocol.replace("http", "ws")}//${window.location.host}/ws?${params.toString()}`
        )
        setSocket(socket)
    }

    useEffect(() => {
        if(!socket) {
            const session = getSession()
            const gameID = urlParams().get(QueryParams.GAMEID)
            if(session && gameID) {
                setPlayerId(session.id)
                connect(session, gameID)
            }
            return;
        }

        const onMessage = (event : MessageEvent) => {
            const message = JSON.parse(event.data)
            if(message.type === "errors" && message.code === ServerErrors.AuthError) {
                logout()
                setPlayerId('')
            } else if (message.type === "gameUpdate") {
                setMachine(makeGame(message.state, message.context))
            }
        }

        socket.addEventListener("message", onMessage)

        return () => {
            socket.removeEventListener("message", onMessage)
        }
    }, [socket])

    return <Context.Provider value={{
        playerId,
        can : (event) => !!GameMachine.transition(machine?.state, {playerId, ...event} as GameEvents).changed,
        send: (event) => {
            const e = {playerId, ...event}
            socket?.send(JSON.stringify({type : "gameUpdate", event :e}))
        },
        connect : connect,
        context: machine?.state.context,
        state: machine ? machine.state.value as GameState : null
    }}>
        {children}
    </Context.Provider>
}