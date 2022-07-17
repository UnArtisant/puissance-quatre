import SelectName from "./container/select-name";
import ColorSelector from "./container/color-selector";
import {PlayersColors} from "../machines/game-machine/GameType";

function App() {
    return (
        <div className="container">
            <SelectName disabled onSelect={(e) => console.log(e)}/>
            <ColorSelector onSelect={(e) => console.log(e)} players={[
                {
                    id: "1",
                    name: "john",
                    color: PlayersColors.RED
                },
                {
                    id: "2",
                    name: "doe",
                    color: PlayersColors.YELLOW
                }
            ]}/>
        </div>
    )
}

export default App
