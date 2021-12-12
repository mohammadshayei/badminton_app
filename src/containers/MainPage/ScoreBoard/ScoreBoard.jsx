import React from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import FooterScoreBoard from "./FooterScoreBoard/FooterScoreBoard";
import PlayerBlock from "./PlayerBlock/PlayerBlock";
import "./ScoreBoard.scss";
import back from "../../../assets/images/back_scoreboard.jpg"
import { FaPlayCircle, FaExclamation } from "react-icons/fa";
import { ImUndo2 } from "react-icons/im";

const ScoreBoard = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="scoreboard-container"
      style={{
        color: theme.on_primary,
      }}
    >
      <img className="background" src={back} alt="back" />
      <div className="main-scoreboard">
        <PlayerBlock
          playerName={"بازیکن شماره 1"}
          playerNameD={"بازیکن شماره 1"}
          setWon="0"
          score="0"
          scoreColor="#AB0000" //FF0000
          isServer="1"
          position="left"
        />
        <PlayerBlock
          playerName={"بازیکن شماره 2"}
          playerNameD={"بازیکن شماره 2"}
          setWon="0"
          score="0"
          scoreColor="#AB0000"
          isServer="0"
          position="right"
        />
        {/* <div className="warm-up">Warm Up!</div>
        <FaPlayCircle className="play" /> */}
      </div>
      {/* <FooterScoreBoard /> */}
      <div className="action-buttons">
        <FaExclamation className="action-btn" style={{ color: theme.primary }} />
        <ImUndo2 className="action-btn" style={{ color: theme.primary }} />
      </div>
    </div >
  );
};

export default ScoreBoard;
