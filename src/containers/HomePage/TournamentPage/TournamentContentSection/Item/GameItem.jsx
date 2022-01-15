import { GoSettings } from "react-icons/go";
import { useTheme } from "../../../../../styles/ThemeProvider";

const GameItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    return (
        <div
            className="game-item-wrapper"
            style={{
                background:
                    props.status === 2 &&
                    `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
                color: props.status === 2 ? theme.on_primary : theme.on_background,
                boxShadow:
                    props.status === 2 &&
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            onClick={props.onClick}
        >
            <div className="game-online-result">
                <div className="names right">{props.teamA.players.map((player, i) => <p key={i} className="name">{player.player.username}</p>)}</div>
                <p className="score">{`${props.teamA.setWon} - ${props.teamB.setWon}`}</p>
                <div className="names">{props.teamB.players.map((player, i) => <p key={i} className="name">{player.player.username}</p>)}</div>
            </div>
            <div className="game-details">{`شماره زمین : ${props.land_number} - شماره بازی : ${props.game_number}`}</div>
        </div>
    )
}

export default GameItem
