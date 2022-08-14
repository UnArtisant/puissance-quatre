import {GameState} from "../lib/types/GameType";
import {useGame} from "./hooks/useGame";
import LobbyScreens from "./container/lobbyScreens";
import PlayScreens from "./container/playScreens";
import Grid from "./components/grid";
import {currentPlayer} from "../lib/func/game";
import VictoryScreens from "./container/victoryScreens";

function App() {
    const {state, context, send} = useGame()

    const canDrop = state === GameState.PLAY
    const player = canDrop ? currentPlayer(context!) : {}
    const dropToken = canDrop ? (x : number) => send({type: "dropToken", x}) : undefined

    return (
        <div className="container">

             <LobbyScreens />
            {state === GameState.PLAY && <PlayScreens />}
            {state === GameState.WIN && <VictoryScreens />}
            {/** TODO Tight screen */}
            {state === GameState.TIGHT && <VictoryScreens />}

            {state && <Grid  onDrop={dropToken} color={player?.color} grid={context!.grid}  />}

        </div>
    )
}

export default App
