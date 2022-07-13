import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "../../../../styles/ThemeProvider"
import * as infoActions from "../../../../store/actions/setInfo"
import Button from "../../../../components/UI/Button/Button"
import "./WinnerModal.scss"
import { useNavigate, useLocation } from "react-router-dom"
import { stringFa } from "../../../../assets/strings/stringFaCollection"
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton"

const WinnerModal = (props) => {
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme
    const info = useSelector(state => state.info)
    const dispatch = useDispatch();
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const court = searchParams.get("court");
    const gym = searchParams.get("gym");
    const removeScores = () => {
        dispatch(infoActions.removeScores());
    };

    const onButtonClick = () => {
        if (gym && court)
            navigate(`/my_games?gym=${gym}&court=${court}`)
        else if (gym)
            navigate(`/my_games?gym=${gym}`)
        else
            navigate(`/my_games`)
        removeScores();
    }

    const onBackClick = () => {
        props.undo(info.team1.score > info.team2.score ? "team1" : "team2")
        props.setSetOverConfirmation(false)
    }

    return (
        <div className="winner-modal-wrapper">
            <div
                className="details"
                style={{
                    fontSize: `${Math.min(window.innerWidth * 0.03, 32)}px`,
                    flexDirection: info.team1.isRightTeam ? "row" : "row-reverse"
                }}>
                <div className={`team-block ${info.team1.isRightTeam ? "team-rev" : ""} ${props.teamWon === "team1" && "winner"}`}
                    style={{ color: props.teamWon === "team1" ? theme.primary : theme.on_background }}
                >
                    <p className="scores-details"
                        style={{
                            fontSize: `${Math.min(window.innerWidth * 0.05, 48)}px`,
                            lineHeight: `${Math.min(window.innerWidth * 0.05, 48)}px`,
                        }}
                    >
                        {props.teamWon ? info.team1.scores.map((s) => <p>{s}</p>) : <p>{info.team1.score}</p>}
                    </p>
                    <div className="players-section">
                        <p className="set-score"
                            style={{
                                fontSize: `${Math.min(window.innerWidth * 0.1, 96)}px`,
                            }}
                        >{props.teamWon && info.team1.setWon}</p>
                        {info.team1.players.map((p, i) => <p className="names" key={i}>{p.name}</p>)}
                    </div>
                </div>
                <div className={`team-block ${info.team2.isRightTeam ? "team-rev" : ""} ${props.teamWon === "team2" && "winner"}`}
                    style={{ color: props.teamWon === "team2" ? theme.primary : theme.on_background }}
                >
                    <p className="scores-details"
                        style={{
                            fontSize: `${Math.min(window.innerWidth * 0.05, 48)}px`,
                            lineHeight: `${Math.min(window.innerWidth * 0.05, 48)}px`,
                        }}
                    >
                        {props.teamWon ? info.team2.scores.map((s) => <p>{s}</p>) : <p>{info.team2.score}</p>}
                    </p>
                    <div className="players-section">
                        <p className="set-score"
                            style={{
                                fontSize: `${Math.min(window.innerWidth * 0.1, 96)}px`,
                            }}
                        >{props.teamWon && info.team2.setWon}</p>
                        {info.team2.players.map((p, i) => <p className="names" key={i}>{p.name}</p>)}
                    </div>
                </div>
            </div>
            {props.teamWon ?
                <Button
                    ButtonStyle={{ margin: "0" }}
                    onClick={onButtonClick}
                >
                    End Game
                </Button> :
                <div className="buttons">
                    <Button
                        onClick={() => {
                            props.setOverConfirmed(info.team1.score > info.team2.score ? "team1" : "team2")
                            props.setSetOverConfirmation(false)
                        }}
                    >
                        {stringFa.confirm}
                    </Button>
                    <TransparentButton
                        onClick={onBackClick}
                    >
                        {stringFa.back}
                    </TransparentButton>
                </div>
            }
        </div>
    )
}

export default WinnerModal
