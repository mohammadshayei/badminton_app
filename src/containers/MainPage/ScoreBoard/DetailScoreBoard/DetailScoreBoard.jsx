import React from "react";
import { useTheme } from "../../../../styles/ThemeProvider";
import "./DetailScoreBoard.scss";

const ResultScoreBoard = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="detail-scoreboard-wrapper">
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
        <div className="detail-scorebaord-container">
          <div
            className="detail-scorebaord"
            style={{
              backgroundColor: theme.background_color,
            }}
          >
            <p
              className="set-score-text"
              style={{ color: theme.on_background }}
            >
              {props.teamAScore}
            </p>
          </div>
          <div
            className="detail-scorebaord"
            style={{
              backgroundColor: theme.background_color,
            }}
          >
            <p
              className="set-score-text"
              style={{ color: theme.on_background }}
            >
              {props.teamBScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScoreBoard;
