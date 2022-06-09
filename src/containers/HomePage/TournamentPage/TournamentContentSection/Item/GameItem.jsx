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
                // boxShadow:
                //     props.status === 2 &&
                //     "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.2) 0px 2px 6px 2px",
            }}
            onClick={props.onClick}
        >
            <div className="game-online-result">
                <div className="names right"
                    style={{
                        color: (props.status === 3 && props.teamA.setWon === 2) ?
                            theme.primary :
                            props.status === 2 ?
                                theme.on_primary :
                                theme.on_background,
                    }}
                >{props.teamA.players.map((player, i) =>
                    <div title={player.player.username} key={i} className="name">{player.player.username}</div>)}</div>
                <p className="score">{`${props.teamA.setWon} - ${props.teamB.setWon}`}</p>
                <div className="names"
                    style={{
                        color: (props.status === 3 && props.teamB.setWon === 2) ?
                            theme.primary :
                            props.status === 2 ?
                                theme.on_primary :
                                theme.on_background,
                    }}
                >{props.teamB.players.map((player, i) =>
                    <div title={player.player.username} key={i} className="name">{player.player.username}</div>)}</div>
            </div>
            <div className="game-details">{`شماره زمین : ${props.land_number} - شماره بازی : ${props.game_number}`}</div>
            {props.status === 1 &&
                <div className="is-referee-asigned"
                    style={{
                        opacity: 0.7,
                        background: props.referee && props.service_referee ?
                            `linear-gradient(90deg,${theme.primary_variant},transparent)` :
                            `linear-gradient(90deg,${theme.error},transparent)`
                    }}
                />
            }
        </div>
    )
}

export default GameItem
