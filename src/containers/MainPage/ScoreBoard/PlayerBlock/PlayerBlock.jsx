import React from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/badminton_player.jfif";
import BALL_IMAGE from "../../../../assets/images/badminton_ball.png";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import { AiOutlineMinus } from "react-icons/ai";
import { GiWhistle } from "react-icons/gi";

const PlayerBlock = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className={`player-block-container ${props.player === "1" && "rev"}`}>
      <div
        className={`player-block-action-container ${
          props.player === "2" && "up-align"
        }`}
      >
        <div className="player-block-image">
          <img src={PROFILE_IMAGE} alt="badminton player" />
        </div>
        <div className="player-block-image second-player">
          <img src={PROFILE_IMAGE} alt="badminton second player" />
        </div>
        <div className="player-block-icon-container">
          <div className="player-block-icon">
            <Button
              back={theme.background_color}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "20px",
                padding: "0.3em 0.4em 0 0.4em",
              }}
            >
              <HiOutlinePlusSm className="btn-icon-img" />
            </Button>
            <Button
              back={theme.background_color}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "20px",
                padding: "0.3em 0.4em 0 0.4em",
              }}
            >
              <AiOutlineMinus className="btn-icon-img" />
            </Button>
          </div>
          <div
            className="player-block-icon"
            style={{ justifyContent: "center" }}
          >
            <Button
              back={theme.background_color}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "20px",
                padding: "0.3em 0.4em 0 0.4em",
              }}
            >
              <GiWhistle className="btn-icon-img" />
            </Button>
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
