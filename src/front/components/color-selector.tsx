import {Player, PlayersColors} from "../../lib/types/GameType";
import {discColor} from "../../lib/func/color";

type ColorSelectorProps = {
    onSelect: (color: PlayersColors) => void,
    players: Player[],
    colors : PlayersColors[]
}


function ColorSelector({onSelect, players, colors}: ColorSelectorProps) {

    return (
        <>
            <div className="players">
                {players.map(player => <div className="player" key={player.id}>
                    {player.name}
                    {player?.color && <div className={discColor(player.color)}/>}
                </div>)}

            </div>
            {players.length ? <hr/> : null}
            <h3>Select color</h3>
            <div className="selector">
                {colors.map((color,k) => (<button onClick={() => onSelect(color)} key={k} className={discColor(color)} />))}
            </div>
        </>
    );
}

export default ColorSelector;