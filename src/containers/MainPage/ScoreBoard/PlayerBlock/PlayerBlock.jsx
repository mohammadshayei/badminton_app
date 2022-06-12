import React, { useState, useEffect } from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/avatars/default-avatar.png";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import shuttle_image from "../../../../assets/images/badminton_ball.png";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"
import { baseUrl } from "../../../../constants/Config";

const PlayerBlock = (props) => {
  const [dynamicStyle, setdynamicStyle] = useState({ flexDirection: "column" });
  const [scoreStyle, setScoreStyle] = useState({ color: "#AB0000" });

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
  const setPlayerPlace = (teamKey) => {
    dispatch(infoActions.setPlayerPlace(teamKey));
  };


  const selectPlayer = (id) => {
    if (info.foulHappend) {
      let foul;
      if (info.foulHappend === "Retired")
        foul = "Ret"
      else if (info.foulHappend === "Disqualified")
        foul = "Dis"
      else
        foul = info.foulHappend.substring(0, 1)
      addEvent({ type: info.foulHappend, time: "", by: id, content: foul, detail: null });
      if (info.foulHappend === "Fault") {
        if (props.teamKey === "team1")
          increaseScore({ teamKey: "team2" })
        else
          increaseScore({ teamKey: "team1" })
      }
      foulHappend({ foulType: null });
    }
  };
  useEffect(() => {
    if (info[props.teamKey].score !== 0) {
      setScoreStyle({
        color: info.lastPoint === props.teamKey ? "#FF0000" : "#AB0000",
        textShadow: info.lastPoint === props.teamKey && "0 0 20px #FF0000",
      })
    } else {
      setScoreStyle({
        color: "#AB0000",
        textShadow: '',
      })
    }

  }, [info.lastPoint, info[props.teamKey].score])

  const cancelFoul = () => {
    if (info.foulHappend)
      foulHappend({ foulType: null });
  }
  useEffect(() => {
    if (!info.readyForSendData) return;
    props.setServiceOver(false)
    if (info.undoMode) return;
    const detail = {
      server: {
        number: info.team1.server === 0 ? info.team2.server : info.team1.server,
        teamName: info.team1.server === 0 ? 'team2' : 'team1',
        isTop: info.team1.server === 0 ? info.team2.isTop : info.team1.isTop,

      },
      receiver: {
        number: info.team1.receiver === 0 ? info.team2.receiver : info.team1.receiver,
        teamName: info.team1.receiver === 0 ? 'team2' : 'team1',
        isTop: info.team1.server === 0 ? info.team1.isTop : info.team2.isTop,

      },
    }
    if (props.server === 0) {
      if (props.score !== 0) {
        switchServer();
        props.setServiceOver(true)
      }
    } else if (props.server === 1) {
      if (props.score !== 0) {
        addEvent({ type: "score", time: "", by: props.player.id, content: props.score, detail });
        setPlayerPlace({ teamKey: props.teamKey });
      }
    } else if (props.server === 2) {
      if (props.score !== 0) {
        addEvent({ type: "score", time: "", by: props.playerD.id, content: props.score, detail });
        setPlayerPlace({ teamKey: props.teamKey });
      }
    }
  }, [props.score]);

  useEffect(() => {
    let key = info[props.teamKey].server > 0 ? "server" : "receiver"
    if (props.playerD) {
      if (key === "server")
        if (info[props.teamKey].isTop) {
          setdynamicStyle({
            flexDirection:
              info[props.teamKey][key] === 1 ? "column" : "column-reverse"
          })
        } else {
          setdynamicStyle({
            flexDirection:
              info[props.teamKey][key] === 1 ? "column-reverse" : "column"
          })
        }
      else
        if (info.team1.score === 0 && info.team2.score === 0)
          if (info[props.teamKey].isTop) {
            setdynamicStyle({
              flexDirection:
                info[props.teamKey][key] === 1 ? "column" : "column-reverse"
            })
          } else {
            setdynamicStyle({
              flexDirection:
                info[props.teamKey][key] === 1 ? "column-reverse" : "column"
            })
          }
    }
  }, [props.score, info[props.teamKey].isTop])
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
          <p className="player-name">{props.player && props.player.name}</p>
          <div className="player-img"
            style={{
              boxShadow: props.server === 1 ? "0 0 0 15px #F7FF00" :
                (props.playerD && props.receiver === 1) && `15px solid ${theme.primary_variant}`
            }}
            onClick={() => selectPlayer(props.player.id)}
          >
            <img src={props.player && props.player.avatar !== '' ?
              `${baseUrl}uploads/players/${props.player.avatar}` :
              PROFILE_IMAGE} alt="badminton player" />
          </div>
          {props.playerD &&
            <div className="player-img"
              style={{
                boxShadow: props.server === 2 ? "15px solid #F7FF00" :
                  props.receiver === 2 && `15px solid ${theme.primary_variant}`
              }}
              onClick={() => selectPlayer(props.playerD.id)}
            >
              <img src={props.playerD.avatar ?
                `${baseUrl}uploads/players/${props.playerD.avatar}` :
                PROFILE_IMAGE}
                alt="badminton second player"
              />
            </div>
          }
          {props.playerD && <p className="player-name">{props.playerD.name}</p>}
        </div>
        <div disabled={info.foulHappend ? 1 : 0} className="player-block-icon-container"
          style={{ opacity: info.foulHappend ? 0 : 1 }}>
          {props.position === "right" && <div className="player-block-icon add-shuttle">
            <Button
              back={theme.primary}
              hover={theme.primary}
              ButtonStyle={{
                borderRadius: "50%",
                // aspectRatio: "1",
                width: "3rem",
                height: "3rem"
              }}
              onClick={() => {
                increaseBall();
                // addEvent({ type: "increaseBall", time: "", by: "" });
              }}
            >
              +
              <img src={shuttle_image} className="shuttle-img" alt="shuttle" />
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
                  // addEvent({ type: "decreaseBall", time: "", by: "" });
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
                transform: props.position === "right" && "translateY(-40%)",
                padding: "0"
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
            fontSize: props.score > 9 ? "17vw" : "20vw",
            ...scoreStyle
          }}>
            {props.score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerBlock;
