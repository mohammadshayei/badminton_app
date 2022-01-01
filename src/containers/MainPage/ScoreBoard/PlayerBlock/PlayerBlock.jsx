import React, { useState, useEffect } from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/avatars/default-avatar.png";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import shuttle_image from "../../../../assets/images/badminton_ball.png";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"

const PlayerBlock = (props) => {
  const [dynamicStyle, setdynamicStyle] = useState(null)
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
  const foulHappend = (type) => {
    dispatch(infoActions.foulHappend(type));
  };
  const addEvent = (event) => {
    dispatch(infoActions.addEvent(event));
  };
  const switchServer = (server) => {
    dispatch(infoActions.switchServer(server));
  };

  const selectPlayer = (name) => {
    if (info.foulHappend) {
      let foul;
      if (info.foulHappend === "Retired")
        foul = "Ret"
      else
        foul = info.foulHappend.substring(0, 1)
      addEvent({ type: info.foulHappend, time: "", by: name, content: foul });
      foulHappend({ foulType: null });
    }
  };

  const cancelFoul = () => {
    if (info.foulHappend)
      foulHappend({ foulType: null });
  }

  useEffect(() => {

    if (props.playerNameD) {
      if (props.server === 1) {
        if (props.score !== 0) addEvent({ type: "score", time: "", by: props.playerName, content: props.score });
        if (props.score % 2 === 0) {
          setdynamicStyle({ flexDirection: props.position === "left" ? "column-reverse" : "column" })
        } else {
          setdynamicStyle({ flexDirection: props.position === "left" ? "column" : "column-reverse" })
        }
      } else if (props.server === 2) {
        if (props.score !== 0) addEvent({ type: "score", time: "", by: props.playerNameD, content: props.score });
        if (props.score % 2 === 0) {
          setdynamicStyle({ flexDirection: props.position === "left" ? "column" : "column-reverse" })
        } else {
          setdynamicStyle({ flexDirection: props.position === "left" ? "column-reverse" : "column" })
        }
      }

      if (props.score !== 0 && props.server === 0)
        if (props.score % 2 === 0) {
          switchServer({ server: 1 })
          addEvent({ type: "score", time: "", by: props.playerName, content: props.score });
        } else {
          switchServer({ server: 2 })
          addEvent({ type: "score", time: "", by: props.playerNameD, content: props.score });
        }
    } else {
      if (props.score !== 0) {
        if (props.server === 0)
          switchServer({ server: 1 })
        addEvent({ type: "score", time: "", by: props.playerName, content: props.score });
      }
    }

  }, [props.score]);

  return (
    <div className={`player-block-container ${props.position === "left" && "rev"}`}
      onClick={cancelFoul}
    >
      <div
        className={`player-block-action-container ${props.position === "right" && "action-rev"
          }`}
      >
        <div className={`player-block-image-and-title ${info.foulHappend && 'blink'}`}
          style={dynamicStyle}
        >
          <p className="player-name">{props.playerName}</p>
          <img src={props.playerImg ? props.playerImg : PROFILE_IMAGE} alt="badminton player" style={{
            outline: props.server === 1 && "15px solid #F7FF00"
          }} onClick={() => selectPlayer(props.playerName)} />
          {props.playerNameD && <img src={props.playerImgD ? props.playerImgD : PROFILE_IMAGE} alt="badminton second player" style={{
            outline: props.server === 2 && "15px solid #F7FF00"
          }} onClick={() => selectPlayer(props.playerNameD)} />}
          {props.playerNameD && <p className="player-name">{props.playerNameD}</p>}
        </div>
        <div disabled={info.foulHappend ? 1 : 0} className="player-block-icon-container"
          style={{ opacity: info.foulHappend ? 0 : 1 }}>
          {props.position === "right" && <div className="player-block-icon">
            <Button
              back={theme.primary}
              hover={theme.primary}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
              }}
              onClick={() => {
                increaseBall();
                addEvent({ type: "increaseBall", time: "", by: "" });
              }}
            >
              +
              <img src={shuttle_image} alt="shuttle" />
            </Button>
            <Button
              back={theme.primary}
              hover={theme.primary}
              ButtonStyle={{
                borderRadius: "50%",
                aspectRatio: "1",
              }}
              onClick={() => {
                if (info.balls > 1) {
                  decreaseBall();
                  addEvent({ type: "decreaseBall", time: "", by: "" });
                }
              }}
            >
              -
              <img src={shuttle_image} alt="shuttle" />
            </Button>
          </div>}
          <div disabled={props.disable} className="player-block-icon up-btn">
            <Button
              back={theme.primary}
              hover={theme.primary}
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
      <div disabled={info.foulHappend ? 1 : 0} className="score-place-and-set-container"
        style={{ opacity: info.foulHappend ? 0 : 1 }}>
        {props.scores.length > 0 &&
          <div className={`prev-score ${props.position === "right" && "rev-prev-score"}`}>
            {props.scores.map((s, i) =>
              <p key={i}>
                {s}
              </p>
            )}
          </div>}
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
