import React from "react";
import { useTheme } from "../../../../styles/ThemeProvider";
import "./DetailScoreBoard.scss";

const ResultScoreBoard = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="detail-scoreboard-wrapper">
      <p
        className="detail-scoreboard-time"
        style={{
          textAlign: "center",
          fontSize: "5rem",
          lineHeight: "4rem",
          color: "red",
        }}
      >
        {props.time}
      </p>

      <div className="detail-scorebaord-container">
        <div
          className="detail-scorebaord"
          style={{
            backgroundColor: theme.background_color,
          }}
        >
          <p>{props.teamAScore}</p>
        </div>
        <div
          className="detail-scorebaord"
          style={{
            backgroundColor: theme.background_color,
          }}
        >
          <p>{props.teamBScore}</p>
        </div>
      </div>
      <div className="detail-scoreboard-content">
        <p className="detail-scoreboard-time">{props.time}</p>

        <p
          className="detail-scoreboard-title"
          style={{ color: theme.on_primary }}
        >
          بازی سوم
        </p>
        <p
          className="detail-scoreboard-title"
          style={{ color: theme.on_primary }}
        >
          شماره زمین : 3
        </p>
      </div>
    </div>
  );
};

export default ResultScoreBoard;
