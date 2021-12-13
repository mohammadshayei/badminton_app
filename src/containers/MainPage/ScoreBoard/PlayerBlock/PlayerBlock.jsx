import React from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/badminton_player.jfif";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import shuttle_image from "../../../../assets/images/badminton_ball.png";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"

const PlayerBlock = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const info = useSelector(state => state.info)

  const dispatch = useDispatch();
  const increaseScore = (teamKey) => {
    dispatch(infoActions.increaseScore(teamKey));
  };
  const increaseBall = () => {
    dispatch(infoActions.increaseBall());
  };
  const decreaseBall = () => {
    dispatch(infoActions.decreaseBall());
  };
  const setAwait = (waiting) => {
    dispatch(infoActions.setAwait(waiting));
  };

  const selectPlayer = (n) => {
    if (info.isWaiting) setAwait({ waiting: false });
  }

  return (
    <div className={`player-block-container ${props.position === "left" && "rev"}`}>
      <div
        className={`player-block-action-container ${props.position === "right" && "action-rev"
          }`}
      >
        <div className="player-block-image-and-title">
          <p className="player-name">{props.playerName}</p>
          <img src={PROFILE_IMAGE} alt="badminton player" style={{
            outline: props.server === 1 && "15px solid #F7FF00"
          }} onClick={() => selectPlayer(1)} />
          <img src={PROFILE_IMAGE} alt="badminton second player" style={{
            outline: props.isServer === 2 && "15px solid #F7FF00"
          }} onClick={() => selectPlayer(2)} />
          <p className="player-name">{props.playerNameD}</p>
        </div>
        <div className="player-block-icon-container" style={{ opacity: info.isWaiting ? 0 : 1 }}>
          {props.position === "right" && <div className="player-block-icon">
            <Button
              back={theme.primary}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
              }}
              onClick={() => increaseBall()}
            >
              +
              <img src={shuttle_image} alt="shuttle" />
            </Button>
            <Button
              back={theme.primary}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
              }}
              onClick={() => { if (info.balls > 1) decreaseBall() }}
            >
              -
              <img src={shuttle_image} alt="shuttle" />
            </Button>
          </div>}
          <div className="player-block-icon up-btn">
            <Button
              back={theme.primary}
              hover={theme.hover}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
                width: "90%",
                marginTop: props.position === "right" && "-4rem"
              }}
              onClick={() => increaseScore({ teamKey: props.teamKey })}
            >
              <HiOutlinePlusSm color={theme.on_primary} className="btn-icon-img" />
            </Button>
          </div>
        </div>
      </div>
      <div className="score-place-and-set-container" style={{ opacity: info.isWaiting ? 0 : 1 }}>
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
