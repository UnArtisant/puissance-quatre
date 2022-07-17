import {Player, PlayersColors} from "../../../machines/game-machine/GameType";
import clsx from "clsx";

type ColorSelectorProps = {
    onSelect: (color: string) => void,
    players: Player[]
}

function Index({onSelect, players}: ColorSelectorProps) {
    return (
        <div className="players">
            {players.map(player => <div key={player.id}>
                {player.name}
                {player?.color && <div className={clsx(
                    "disk",
                    player.color === PlayersColors.RED ? "red" : "yellow"
                )}/>}
            </div>)}
        </div>
    );
}

export default Index;