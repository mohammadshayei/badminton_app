import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTheme } from "../../../../styles/ThemeProvider"
import Button from "../../../../components/UI/Button/Button"
import "./WinnerModal.scss"

const WinnerModal = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    const [winner, setWinner] = useState(["علی", "ممد"])
    const info = useSelector(state => state.info)

    useEffect(() => {
        let players = ["undefined!"];
        if (props.teamWon === 'team1')
            players = info.team1.players.map((player) => player.name)
        else if (props.teamWon === 'team2')
            players = info.team1.players.map((player) => player.name)
        setWinner(players);
    }, [props.teamWon])

    return (
        <div className="winner-modal-wrapper">
            <p className="title">{`: برنده`}</p>
            <p className="winner-name"
                style={{ color: theme.primary }}
            >
                {winner.join(" - ")}
            </p>
            <Button onClick={() => window.location.reload(false)}> تایید </Button>
        </div>
    )
}

export default WinnerModal
