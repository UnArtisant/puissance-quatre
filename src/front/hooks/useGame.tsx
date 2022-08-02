import {GameContext, GameEvent, GameEvents, GameState, Player} from "../../lib/types/GameType";
import {createContext, PropsWithChildren, useContext} from "react";
import {GameMachine} from "../../machines/game-machine/GameMachine";
import {useMachine} from "@xstate/react";

export type GameContextType = {
    playerId : Player['id'],
    can: <T extends GameEvents["type"]>(event : {type : T} & Omit<GameEvent<T>, "playerId">) => boolean,
    send: <T extends GameEvents["type"]>(event: {type : T} & Omit<GameEvent<T>, "playerId">) => void,
    context: GameContext,
    state: GameState
}

const Context = createContext<GameContextType>({} as any)

export function useGame () {
    return useContext(Context)
}


export const GameContextProvider = ({children}: PropsWithChildren) => {
    const [state, send] = useMachine(GameMachine)
    const playerId = state.context.currentPlayer ?? ''
    return <Context.Provider value={{
        playerId,
        can : (event) => !!GameMachine.transition(state, {playerId, ...event} as GameEvents).changed,
        send: (event) => send({playerId, ...event} as GameEvents),
        context: state.context,
        state: state.value as GameState
    }}>
        {children}
    </Context.Provider>
}