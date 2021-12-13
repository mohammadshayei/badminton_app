import React, { useState, useEffect } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import FooterScoreBoard from "./FooterScoreBoard/FooterScoreBoard";
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
  const [scoreColor, setScoreColor] = useState(["#AB0000", "#AB0000"])
  const [eventPicker, setEventPicker] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setOver = (teamKey) => {
    dispatch(infoActions.setOver(teamKey));
  };

  useEffect(() => {
    if (info.team1.score === 0)
      setScoreColor(["#AB0000", "#AB0000"])
    else
      setScoreColor(["#FF0000", "#AB0000"])
    if (info.team1.score === 21)
      setOver({ teamKey: "team1" })
  }, [info.team1.score])

  useEffect(() => {
    if (info.team2.score === 0)
      setScoreColor(["#AB0000", "#AB0000"])
    else
      setScoreColor(["#AB0000", "#FF0000"])
    if (info.team2.score === 21)
      setOver({ teamKey: "team2" })
  }, [info.team2.score])

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
        {/* <div className="warm-up">Warm Up!</div>
        <FaPlayCircle className="play" /> */}
      </div>
      {/* <FooterScoreBoard /> */}
      <div className="action-buttons" style={{ opacity: info.isWaiting ? 0 : 1 }}>
        <FaExclamation className="action-btn" style={{ color: theme.primary }} onClick={() => setEventPicker(true)} />
        <ImUndo2 className="action-btn" style={{ color: theme.primary, filter: "grayscale(10)" }} />
      </div>
    </div >
  );
};

export default ScoreBoard;
