import {Player, PlayersColors} from "../../../lib/types/GameType";
import {discColor} from "../../../lib/func/color";

type ColorSelectorProps = {
    onSelect: (color: string) => void,
    players: Player[],
    colors : PlayersColors[]
}


function Index({onSelect, players, colors}: ColorSelectorProps) {

    return (
        <>
            <div className="players">
                {players.map(player => <div className="player" key={player.id}>
                    {player.name}
                    {player?.color && <div className={discColor(player.color)}/>}
                </div>)}

            </div>
            <hr/>
            <h3>Select color</h3>
            <div className="selector">
                {colors.map((color,k) => (<button onClick={() => onSelect(color)} key={k} className={discColor(color)} />))}
            </div>
        </>
    );
}

export default Index;