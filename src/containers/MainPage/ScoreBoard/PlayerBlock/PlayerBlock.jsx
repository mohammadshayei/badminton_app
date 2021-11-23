import React from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/badminton_player.jfif";
import BALL_IMAGE from "../../../../assets/images/badminton_ball.png";
import RoundedIcon from "../../../../components/UI/Button/RoundedIcon/RoundedIcon";
import { useTheme } from "../../../../styles/ThemeProvider";

const PlayerBlock = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="player-block-container">
      <div className="player-block-action-container">
        <img
          className="player-block-image"
          src={PROFILE_IMAGE}
          alt="badminton player"
        />
        <div className="player-block-icon-container">
          <div
            className="player-block-icon"
            style={{ justifyContent: "space-around" }}
          >
            <RoundedIcon
              color="rgba(255, 255, 0,.8)"
              type="plus"
              style={{ margin: "0.3rem 0" }}
            />
            <RoundedIcon
              color="rgba(255, 0, 0,.6)"
              type="minus"
              style={{ margin: "0.3rem 0" }}
            />
          </div>
          <div
            className="player-block-icon"
            style={{ justifyContent: "center" }}
          >
            <RoundedIcon
              color="rgba(0, 0, 0,.6)"
              type="whistle"
              style={{ margin: "0.3rem 0" }}
            />
          </div>
        </div>
      </div>
      <div className="score-place-and-title-container">
        <p
          className={`score-place-title ${props.player === "2" && "hidden"}`}
          style={{ color: theme.on_primary }}
        >
          {props.titleTop}
        </p>
        <div
          className="score-place-container"
          style={{
            backgroundColor: theme.background_color,
          }}
        >
          <p className="score-text" style={{ color: props.scoreColor }}>
            {props.score}
          </p>
          {props.isBall && (
            <img className="badminton-ball" src={BALL_IMAGE} alt="ball" />
          )}
        </div>
        <p
          className={`score-place-title ${
            props.player === "1" && "hidden"
          } test`}
          style={{ color: theme.on_primary }}
        >
          {props.titleTop}
        </p>
      </div>
    </div>
  );
};

export default PlayerBlock;
