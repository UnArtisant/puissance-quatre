import SelectName from "./container/select-name";
import ColorSelector from "./container/color-selector";
import {PlayersColors} from "../lib/types/GameType";
import Grid from "./container/grid/grid";

function App() {
    return (
        <div className="container">
            <SelectName disabled onSelect={(e) => console.log(e)}/>
            <hr/>
            <ColorSelector colors={[PlayersColors.RED, PlayersColors.YELLOW]}
                           onSelect={(e) => console.log(e)}
                           players={[
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
            <hr/>
            <Grid grid={[
                ["E", "E", "E", "E", "E", "E", "Y"],
                ["E", "E", "E", "E", "E", "R", "R"],
                ["E", "E", "E", "E", "E", "R", "Y"],
                ["E", "E", "E", "E", "E", "R", "R"],
                ["E", "E", "E", "E", "E", "Y", "Y"],
                ["E", "E", "E", "E", "E", "Y", "R"]
            ]} />
        </div>
    )
}

export default App
