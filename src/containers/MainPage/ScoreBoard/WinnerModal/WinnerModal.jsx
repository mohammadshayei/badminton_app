import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "../../../../styles/ThemeProvider"
import * as infoActions from "../../../../store/actions/setInfo"
import Button from "../../../../components/UI/Button/Button"
import "./WinnerModal.scss"
import { useNavigate } from "react-router-dom"
import { stringFa } from "../../../../assets/strings/stringFaCollection"
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton"

const WinnerModal = (props) => {
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme
    const info = useSelector(state => state.info)
    const dispatch = useDispatch();
    const removeScores = () => {
        dispatch(infoActions.removeScores());
    };

    const onButtonClick = () => {
        navigate('/my_games')
        removeScores();
    }

    return (
        <div className="winner-modal-wrapper">
            <div className="details" style={{ flexDirection: info.team1.isRightTeam ? "row" : "row-reverse" }}>
                <div className={`team-block ${info.team1.isRightTeam ? "team-rev" : ""} ${props.teamWon === "team1" && "winner"}`}
                    style={{ color: props.teamWon === "team1" ? theme.primary : theme.on_background }}
                >
                    <p className="scores-details">
                        {props.teamWon ? info.team1.scores.map((s) => <p>{s}</p>) : <p>{info.team1.score}</p>}
                    </p>
                    <div className="players-section">
                        <p className="set-score">{props.teamWon && info.team1.setWon}</p>
                        {info.team1.players.map((p, i) => <p className="names" key={i}>{p.name}</p>)}
                    </div>
                </div>
                <div className={`team-block ${info.team2.isRightTeam ? "team-rev" : ""} ${props.teamWon === "team2" && "winner"}`}
                    style={{ color: props.teamWon === "team2" ? theme.primary : theme.on_background }}
                >
                    <p className="scores-details">
                        {props.teamWon ? info.team2.scores.map((s) => <p>{s}</p>) : <p>{info.team2.score}</p>}
                    </p>
                    <div className="players-section">
                        <p className="set-score">{props.teamWon && info.team2.setWon}</p>
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
                        onClick={() => {
                            props.undo()
                            props.setSetOverConfirmation(false)
                        }}
                    >
                        {stringFa.back}
                    </TransparentButton>
                </div>
            }
        </div>
    )
}

export default WinnerModal
