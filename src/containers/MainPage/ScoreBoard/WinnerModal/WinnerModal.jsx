import { useSelector } from "react-redux"
import { useTheme } from "../../../../styles/ThemeProvider"
import Button from "../../../../components/UI/Button/Button"
import "./WinnerModal.scss"
import { useNavigate } from "react-router-dom"

const WinnerModal = (props) => {
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme
    const info = useSelector(state => state.info)

    return (
        <div className="winner-modal-wrapper">
            <div className="details" style={{ flexDirection: info.team1.isRightTeam ? "row-reverse" : "row" }}>
                <div className={`team-block 
                ${info.team1.isRightTeam ? "rev" : ""}
                ${props.teamWon === "team1" && "winner"}`}
                    style={{ color: props.teamWon === "team1" ? theme.primary : theme.on_background }}
                >
                    <div className="players-section">
                        {info.team1.players.map((p, i) => <p className="names" key={i}>{p.name}</p>)}
                    </div>
                    <div className="set-score">
                        <p>{info.team1.setWon}</p>
                        <p className="scores-details">
                            {info.team1.scores.map((s) => <p>{s}</p>)}
                        </p>
                    </div>
                </div>
                <div className={`team-block 
                ${info.team2.isRightTeam ? "rev" : ""}
                ${props.teamWon === "team2" && "winner"}`}
                    style={{ color: props.teamWon === "team2" ? theme.primary : theme.on_background }}
                >
                    <div className="players-section">
                        {info.team2.players.map((p, i) => <p className="names" key={i}>{p.name}</p>)}
                    </div>
                    <div className="set-score">
                        <p>{info.team2.setWon}</p>
                        <p className="scores-details">
                            {info.team2.scores.map((s) => <p>{s}</p>)}
                        </p>
                    </div>
                </div>
            </div>
            <Button onClick={() => navigate('/home')}> تایید </Button>
        </div>
    )
}

export default WinnerModal
