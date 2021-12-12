import React from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/badminton_player.jfif";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import shuttle_image from "../../../../assets/images/badminton_ball.png";

const PlayerBlock = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className={`player-block-container ${props.position === "left" && "rev"}`}>
      <div
        className={`player-block-action-container ${props.position === "right" && "action-rev"
          }`}
      >
        <div className="player-block-image-and-title">
          <p className="player-name">{props.playerName}</p>
          <img src={PROFILE_IMAGE} alt="badminton player" style={{
            outline: props.isServer === "1" && "20px solid #F7FF00"
          }} />
          <img src={PROFILE_IMAGE} alt="badminton second player" style={{
            outline: props.isServer === "2" && "20px solid #F7FF00"
          }} />
          <p className="player-name">{props.playerNameD}</p>
        </div>
        <div className="player-block-icon-container">
          <div className={`player-block-icon ${props.position === "left" && "left-btn"}`}>
            <Button
              back={theme.primary}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
                width: "50%",
              }}
            >
              <img src={shuttle_image} alt="shuttle" />
            </Button>
          </div>
          <div className="player-block-icon up-btn">
            <Button
              back={theme.primary}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
                width: "90%",
              }}
            >
              <HiOutlinePlusSm color={theme.on_primary} className="btn-icon-img" />
            </Button>
          </div>
        </div>
      </div>
      <div className="score-place-and-set-container">
        <p
          className={`set ${props.position === "right" && "set-rev"}`}
        >
          {props.setWon}
        </p>
        <div className="score-place-container">
          <p className="score-text" style={{
            color: props.scoreColor
            , textShadow: props.scoreColor === "#FF0000" && "0 0 20px #FF0000"
          }}>
            {props.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerBlock;
