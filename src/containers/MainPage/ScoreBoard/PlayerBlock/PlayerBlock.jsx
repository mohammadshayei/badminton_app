/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./PlayerBlock.scss";
import PROFILE_IMAGE from "../../../../assets/images/avatars/default-avatar.png";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"
import { baseUrl } from "../../../../constants/Config";
import { BsArrowDownUp } from "react-icons/bs";

const PlayerBlock = (props) => {
  const [dynamicStyle, setdynamicStyle] = useState({});
  const [scoreStyle, setScoreStyle] = useState({ color: "#AB0000" });

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const info = useSelector(state => state.info)
  const dispatch = useDispatch();
  const increaseScore = (teamKey) => {
    dispatch(infoActions.increaseScore(teamKey));
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
  const swapPlayers = (teamKey) => {
    dispatch(infoActions.swapPlayers(teamKey));
  };

  const swapPlayersFunc = () => {
    swapPlayers({ teamKey: props.teamKey })
  }

  const selectPlayer = (id) => {
    if (info.foulHappend) {
      let foul;
      if (info.foulHappend === "Retired")
        foul = "Ret"
      else if (info.foulHappend === "Disqualified")
        foul = "Dis"
      // else if (info.foulHappend === "Service Court Error")
      //   foul = "C"
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
    if (!info.readyForSendData || info.midStage) return;
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
      if (info[props.teamKey].isTop) {
        setdynamicStyle({
          name1: info[props.teamKey][key] === 1 ? 1 : 4,
          image1: info[props.teamKey][key] === 1 ? 2 : 3,
          name2: info[props.teamKey][key] === 1 ? 4 : 1,
          image2: info[props.teamKey][key] === 1 ? 3 : 2,
        })
      } else {
        setdynamicStyle({
          name1: info[props.teamKey][key] === 1 ? 4 : 1,
          image1: info[props.teamKey][key] === 1 ? 3 : 2,
          name2: info[props.teamKey][key] === 1 ? 1 : 4,
          image2: info[props.teamKey][key] === 1 ? 2 : 3,
        })
      }
      // if (key === "server")
      // else
      //   if (info.team1.score === 0 && info.team2.score === 0)
      //     if (info[props.teamKey].isTop) {
      //       setdynamicStyle({
      //         name1: info[props.teamKey][key] === 1 ? 1 : 4,
      //         image1: info[props.teamKey][key] === 1 ? 2 : 3,
      //         name2: info[props.teamKey][key] === 1 ? 4 : 1,
      //         image2: info[props.teamKey][key] === 1 ? 3 : 2,
      //       })
      //     } else {
      //       setdynamicStyle({
      //         name1: info[props.teamKey][key] === 1 ? 4 : 1,
      //         image1: info[props.teamKey][key] === 1 ? 3 : 2,
      //         name2: info[props.teamKey][key] === 1 ? 1 : 4,
      //         image2: info[props.teamKey][key] === 1 ? 2 : 3,
      //       })
      //     }
    }
  }, [props.score, info[props.teamKey].isTop, info.renderTriger])

  return (
    <div className={`player-block-container ${props.position === "left" && "rev"}`}
      onClick={cancelFoul}
    >
      <div disabled={info.foulHappend ? 1 : 0} className="set-container"
        style={{ opacity: info.foulHappend ? 0 : 1 }}>
        <p className={`set`}
          style={{
            fontSize: `${Math.min(window.innerWidth * 0.1, window.innerHeight * 0.15)}px`,
          }}
        >
          {props.setWon}
        </p>
        {props.scores.length > 0 &&
          <div className={`prev-score ${props.position === "right" && "rev-prev-score"}`}
            style={{
              fontSize: `${Math.min(window.innerWidth * 0.02, window.innerHeight * 0.035)}px`,
            }}
          >
            {props.scores.map((s, i) =>
              <p key={i}>
                {s}
              </p>
            )}
          </div>}
      </div>
      <div className={`player-block-action-container`}>
        <p className="player-name"
          style={{
            fontSize: `${Math.min(window.innerWidth * 0.045, window.innerHeight * 0.05)}px`,
            gridRowStart: dynamicStyle.name1 ? dynamicStyle.name1 : props.playerD ? 1 : 4,
            padding: props.position === "left" ? "0 1.5rem 0 0" : "0 0 0 1rem"
          }}
        >{props.player && props.player.name}</p>
        <div className={`player-img ${info.foulHappend && 'blink'}`}
          onClick={() => selectPlayer(props.player.id)}
          style={{
            gridRow: dynamicStyle.image1 ? `${dynamicStyle.image1} / span 1` : props.playerD ? "2 / 3" : " 2 / 4",
          }}
        >
          <img src={props.player && props.player.avatar !== '' ?
            `${baseUrl}uploads/players/${props.player.avatar}` :
            PROFILE_IMAGE} alt="badminton player"
            style={{
              padding: '1.5vh',
              boxShadow: props.server === 1 ? "0 0 0 1.5vh #F7FF00 inset" :
                (props.playerD && props.receiver === 1) && `0 0 0 1.5vh ${theme.primary} inset`
            }} loading="lazy" />
        </div>
        {props.playerD &&
          <div className={`player-img ${info.foulHappend && 'blink'}`}
            onClick={() => selectPlayer(props.playerD.id)}
            style={{
              gridRow: dynamicStyle.image2 ? `${dynamicStyle.image2} / span 1` : " 3 / 4",
            }}
          >
            <img src={props.playerD.avatar ?
              `${baseUrl}uploads/players/${props.playerD.avatar}` :
              PROFILE_IMAGE}
              alt="badminton second player"
              style={{
                padding: '1.5vh',
                boxShadow: props.server === 2 ? "0 0 0 1.5vh #F7FF00 inset" :
                  props.receiver === 2 && `0 0 0 1.5vh ${theme.primary} inset`
              }}
              loading="lazy"
            />
          </div>
        }
        {props.playerD &&
          <p className="player-name"
            style={{
              fontSize: `${Math.min(window.innerWidth * 0.045, window.innerHeight * 0.05)}px`,
              gridRowStart: dynamicStyle.name2 ? dynamicStyle.name2 : 4,
              padding: props.position === "left" ? "0 1.5rem 0 0" : "0 0 0 1rem"
            }}
          >
            {props.playerD.name}
          </p>}
        <p className="score-text"
          style={{
            fontSize: `${Math.min(window.innerWidth * 0.2, window.innerHeight * 0.3)}px`,
            ...scoreStyle
          }}>
          {props.score}
        </p>
        <div disabled={props.disabledButton || props.disable || info.foulHappend ? 1 : 0}
          className="player-block-icon"
          style={{ opacity: info.foulHappend ? 0 : 1 }}
        >
          <Button
            back={theme.primary}
            hover={theme.primary}
            ButtonStyle={{
              borderRadius: "10px",
              // borderRadius: "clamp(5px,1vw,10px)",
              width: "9vw",
              height: "100%",
              padding: "0"
            }}
            onClick={() => increaseScore({ teamKey: props.teamKey })}
          >
            <HiOutlinePlusSm
              className="btn-icon-img"
              color={theme.on_primary}
              style={{
                fontSize: `${Math.min(window.innerWidth * 0.07, window.innerHeight * 0.15)}px`,
              }}
            />
          </Button>
          {props.playerD &&
            <BsArrowDownUp
              className="swap-players-icon"
              color={theme.primary}
              style={{
                left: props.position === "left" ? "100%" : "auto",
                right: props.position === "left" ? "auto" : "100%",
              }}
              onClick={swapPlayersFunc}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default PlayerBlock;
