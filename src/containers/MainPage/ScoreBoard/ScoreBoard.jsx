import { useState, useEffect } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
// import FooterScoreBoard from "./FooterScoreBoard/FooterScoreBoard";
import PlayerBlock from "./PlayerBlock/PlayerBlock";
import "./ScoreBoard.scss";
import back from "../../../assets/images/back_scoreboard.jpg"
import { FaPlayCircle, FaExclamation } from "react-icons/fa";
import { ImUndo2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../store/actions/setInfo"
import Modal from "../../../components/UI/Modal/Modal"
import Events from "../EventsModule/Events"
import Button from "../../../components/UI/Button/Button"

const ScoreBoard = () => {
  const info = useSelector((state) => state.info);
  const [scoreColor, setScoreColor] = useState(["#AB0000", "#AB0000"]);
  const [eventPicker, setEventPicker] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [timer, setTimer] = useState("00:59");
  const [disable, setDisable] = useState(true);
  const [maxPoint, setMaxPoint] = useState(21);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setOver = (teamKey) => {
    dispatch(infoActions.setOver(teamKey));
  };
  const switchSide = () => {
    dispatch(infoActions.switchSide());
  };

  useEffect(() => {
    switch (info.team1.score) {
      case 0:
        setScoreColor(["#AB0000", "#AB0000"])
        break;
      case maxPoint - 1:
        if (info.team2.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setOver({ teamKey: "team1" });
        switchSide();
        break;
      case 10:
        if (info.team2.score < 11) setBreakTime(1);
        break;
      case 11:
        if (info.team2.score < 11) {
          if (info.team1.setWon + info.team2.setWon === 2)
            switchSide();
          setBreakTime(2);
          setDisable(true);
        }
        break;

      default:
        setScoreColor(["#FF0000", "#AB0000"])
        break;
    }
  }, [info.team1.score])

  useEffect(() => {
    switch (info.team2.score) {
      case 0:
        setScoreColor(["#AB0000", "#AB0000"])
        break;
      case maxPoint - 1:
        if (info.team1.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setOver({ teamKey: "team2" });
        switchSide();
        break;
      case 10:
        if (info.team1.score < 11) setBreakTime(1);
        break;
      case 11:
        if (info.team1.score < 11) {
          if (info.team1.setWon + info.team2.setWon === 2)
            switchSide();
          setBreakTime(2);
          setDisable(true);
        }
        break;

      default:
        setScoreColor(["#AB0000", "#FF0000"]);
        break;
    }
  }, [info.team2.score])

  useEffect(() => {
    if (info.team1.setWon === 2)
      alert("team1 WON!")
    else if (info.team2.setWon === 2)
      alert("team2 WON!")
  }, [info.team1.setWon, info.team2.setWon])

  useEffect(() => {
    if (breakTime === 2) {
      let seconds = 58;
      const interval = setInterval(() => {
        seconds = seconds < 10 ? `0` + seconds : seconds;
        setTimer(`00:${seconds}`);
        if (seconds > 0) seconds--;
      }, 1000);
      setTimeout(() => {
        setBreakTime(0);
        setDisable(false);
        setTimer("00:59");
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [breakTime]);

  return (
    <div
      className="scoreboard-container"
      style={{
        color: theme.on_primary,
      }}
    >
      <img className="background" src={back} alt="back" />
      <Modal show={eventPicker} modalClosed={() => setEventPicker(false)}>
        <Events setClose={setEventPicker} />
        <Button onClick={() => setEventPicker(false)}>انصراف</Button>
      </Modal>
      <div className={`main-scoreboard ${info.team1.isRightTeam && "reverse"}`}>
        {info ?
          Object.entries(info).map(([k, v], index) =>
            (k === "team1" || k === "team2") &&
            (<PlayerBlock
              disable={disable}
              key={k}
              playerImg={v.players[0].img}
              playerImgD={v.players[1] && v.players[1].img}
              playerName={v.players[0].name}
              playerNameD={v.players[1] && v.players[1].name}
              setWon={v.setWon}
              score={v.score}
              scoreColor={scoreColor[index]}
              server={v.server}
              receiver={v.receiver}
              position={v.isRightTeam ? "right" : "left"}
              teamKey={k}
            />)
          )
          : "Loading Info..."}
        {/* <div className="warm-up">Warm Up!</div> */}
        {disable && breakTime === 0 && <FaPlayCircle className="play" onClick={() => setDisable(false)} />}
        {breakTime === 1 && <div className="break-btn" onClick={() => setBreakTime(2)}>Break</div>}
        {breakTime === 2 && <div className="break-timer" >{timer}</div>}
      </div>
      {/* <FooterScoreBoard /> */}
      <div disabled={disable} className="action-buttons" style={{ opacity: info.foulHappend ? 0 : 1 }}>
        <FaExclamation className="action-btn" style={{ color: theme.primary }} onClick={() => setEventPicker(true)} />
        <ImUndo2 className="action-btn" style={{ color: theme.primary, filter: "grayscale(10)" }} />
      </div>
    </div >
  );
};

export default ScoreBoard;
