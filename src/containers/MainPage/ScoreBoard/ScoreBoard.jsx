import { useState, useEffect } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
// import FooterScoreBoard from "./FooterScoreBoard/FooterScoreBoard";
import PlayerBlock from "./PlayerBlock/PlayerBlock";
import "./ScoreBoard.scss";
// import back from "../../../assets/images/back_scoreboard.jpg"
import { FaPlayCircle, FaExclamation } from "react-icons/fa";
import { ImUndo2, ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../store/actions/setInfo"

import Modal from "../../../components/UI/Modal/Modal"
import Events from "../EventsModule/Events"
import Button from "../../../components/UI/Button/Button"
import { endSetHandler, setGameAndSetStatus, setStatusGame } from "../../../api/scoreboard";
import Loading from "../../../components/UI/Loading/Loading";
import { createSet } from "../../../api/home";
import WinnerModal from "./WinnerModal/WinnerModal";
import Selector from "../../HomePage/GamesPage/Selector/Selector";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import rotate from "../../../assets/images/mobile-rotate.png"

const ScoreBoard = ({ disable, setDisable }) => {
  const [eventPicker, setEventPicker] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [halfTime, setHalfTime] = useState(false);
  const [maxPoint, setMaxPoint] = useState(21);
  const [teamWon, setTeamWon] = useState(null);
  const [loading, setLoading] = useState(false)
  const [endSetRequestSended, setEndSetRequestSended] = useState(false)
  const [gameStarted, setGameStarted] = useState(false);
  const [chooseServer, setChooseServer] = useState(false);
  const [serviceOver, setServiceOver] = useState(false)
  const [winPoint, setWinPoint] = useState(null)
  const [warmUp, setWarmUp] = useState(false);
  const [warmUpTimer, setWarmUpTimer] = useState("00:00");
  const [twentySeconds, setTwentySeconds] = useState(false);

  // const [flashEffect, setFlashEffect] = useState("")
  const [dialog, setDialog] = useState(null)

  const gameId = useSelector(state => state.gameInfo.gameId)
  const game = useSelector(state => state.gameInfo.gameReferee)
  const setId = useSelector(state => state.info._id)
  const token = useSelector(state => state.auth.token)
  const socket = useSelector(state => state.auth.socket)
  const info = useSelector((state) => state.info);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setOver = (teamKey, isForce = false) => {
    dispatch(infoActions.setOver(teamKey, isForce));
  };
  const setSetId = (id) => {
    dispatch(infoActions.setSetId(id));
  };
  const switchSide = () => {
    dispatch(infoActions.switchSide());
  };
  const clearEventsAndAddToTotalEvents = () => {
    dispatch(infoActions.clearEventsAndAddToTotalEvents());
  };

  const removeEventFromStack = () => {
    if (info.events[info.events.length - 1].type === 'score') {
      if ((info.team1.score === 10 && info.team2.score <= 10) || (info.team2.score === 10 && info.team1.score <= 10))
        setBreakTime(0)
      if ((info.team1.score === 11 && info.team2.score <= 11) || (info.team2.score === 11 && info.team1.score <= 11)) {
        if (info.team1.setWon + info.team2.setWon === 2)
          switchSide();
        if (halfTime) {
          setHalfTime(false);
          setDisable(false);
          setBreakTime(1);
        }
      }
    }
    dispatch(infoActions.removeEventFromStack());
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!teamWon) {
      if (window.confirm("Do you want to go back ?")) {
        setTeamWon("walk over");
        // your logic
        // props.history.push("/");
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setTeamWon(null);
      }
    }
  }
  const onPreventRefresh = async (e) => {
    e.preventDefault();
    e.returnValue = ''

  }
  const startTheGame = async () => {
    setDialog(null)
    setLoading(true)
    const payload = {
      gameId,
      gameStatus: 2,
      setId,
      setStatus: 2,
    }
    const result = await setGameAndSetStatus(payload, token)
    if (result.success) {
      setDisable(false)
      setGameStarted(true)
    } else {
      setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
    }
    setLoading(false)
  }

  const createNewSet = async () => {
    setDialog(null)
    const payload = {
      gameId,
      teamA: {
        isRightTeam: info.team1.isRightTeam,
        server: info.team1.server,
        receiver: info.team1.receiver,
        players: info.team1.players.map(item => { return { player: item.id } })
      },
      teamB: {
        isRightTeam: info.team2.isRightTeam,
        server: info.team2.server,
        receiver: info.team2.receiver,
        players: info.team2.players.map(item => { return { player: item.id } })
      }
    }
    const resultCreateSet = await createSet(payload, token)
    if (resultCreateSet.success) {
      setSetId(resultCreateSet.data)
    } else {
      setDialog(<ErrorDialog type="error">{resultCreateSet.error}</ErrorDialog>)
    }
  }
  const endSet = async (teamName) => {
    setDialog(null)
    //balls , score and setwon in team ,events 
    if (socket) {
      socket.emit('set_winner_team', { teamName, gameId })
    }
    let payload = {
      setId,
      events: info.events,
      teamA: { score: info.team1.score, setWon: teamName === 'team1' ? true : false },
      teamB: { score: info.team2.score, setWon: teamName === 'team2' ? true : false }
    }
    let resultEnd = await endSetHandler(payload, token)
    if (resultEnd.success) {
      setEndSetRequestSended(true)
      // setDisable(true)
    } else {
      setDialog(<ErrorDialog type="error">{resultEnd.error}</ErrorDialog>)
    }
  }
  const onUndoClickHandler = () => {
    if (info.events.length > 0) {
      removeEventFromStack()
    }
  }


  useEffect(() => {
    if (info.setOver) {
      clearEventsAndAddToTotalEvents()
    }
  }, [info.events]);
  useEffect(() => {
    if (socket && gameStarted && game) {
      const payload = {
        game
      }
      socket.emit('add_live_game', payload)
      setGameStarted(false)
    }

  }, [gameStarted, socket, game])
  useEffect(() => {
    // window.history.pushState(null, null, window.location.pathname);
    // window.addEventListener('popstate', onBackButtonEvent);
    // window.addEventListener('beforeunload', onPreventRefresh);

    return () => {
      // window.removeEventListener('popstate', onBackButtonEvent);
      // window.removeEventListener('beforeunload', onPreventRefresh);

    };
  }, []);
  useEffect(() => {
    switch (info.team1.score) {
      case maxPoint - 1:
        if ((info.team1.score === 20 || info.team1.score === 29) && info.team2.score !== 29)
          setWinPoint(info.team1.setWon === 1 ? "match point" : "game point")
        else
          setWinPoint(null)
        if (info.team2.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setWinPoint(null)
        setOver({ teamKey: "team1" });
        if (info.team1.setWon < 1) {
          switchSide();
          setBreakTime(3);
        }
        setDisable(true);
        setHalfTime(false);
        endSet('team1');
        setMaxPoint(21);
        break;
      case 10:
        if (info.team2.score < 11) setBreakTime(1);
        break;
      case 11:
        if (info.team2.score < 11) {
          if (info.team1.setWon + info.team2.setWon === 2)
            switchSide();
          if (!halfTime) {
            setHalfTime(true);
            setDisable(true);
            setBreakTime(2);
          }
        }
        break;

      default:
        break;
    }
    if (info.team2.score === 20)
      setWinPoint(null)
  }, [info.team1.score])
  useEffect(() => {
    switch (info.team2.score) {
      case maxPoint - 1:
        if ((info.team2.score === 20 || info.team2.score === 29) && info.team1.score !== 29)
          setWinPoint(info.team2.setWon === 1 ? "match point" : "game point")
        else
          setWinPoint(null)
        if (info.team1.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setWinPoint(null)
        setOver({ teamKey: "team2" });
        if (info.team2.setWon < 1) {
          switchSide();
          setBreakTime(3);
        }
        setDisable(true);
        setHalfTime(false);
        endSet('team2');
        setMaxPoint(21);
        break;
      case 10:
        if (info.team1.score < 11) setBreakTime(1);
        break;
      case 11:
        if (info.team1.score < 11) {
          if (info.team1.setWon + info.team2.setWon === 2)
            switchSide();
          if (!halfTime) {
            setHalfTime(true);
            setDisable(true);
            setBreakTime(2);
          }
        }
        break;

      default:
        break;
    }
    if (info.team1.score === 20)
      setWinPoint(null)
  }, [info.team2.score])
  useEffect(() => {
    (async () => {
      if ((info.team1.setWon !== 0 || info.team2.setWon !== 0) &&
        (info.team1.setWon !== 2 && info.team2.setWon !== 2) && endSetRequestSended) {
        createNewSet()
        setEndSetRequestSended(false)

      }
      if (info.team1.setWon === 2)
        setTeamWon("team1");
      else if (info.team2.setWon === 2)
        setTeamWon("team2");
    })()
  }, [info.team1.setWon, info.team2.setWon, endSetRequestSended]);


  useEffect(() => {
    (async () => {
      if (teamWon === 'team1' || teamWon === 'team2') {
        const payload = {
          id: gameId,
          status: 3,
          shuttls: info.balls
        }
        const result = await setStatusGame(payload, token)
        if (result.success) {
          setDisable(true)
        } else {
          setDialog(null)
          setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }
        if (socket) {
          let payloadSocket = {
            teamA: info.team1.scores,
            teamB: info.team2.scores,
            gameId,
          }
          socket.emit('send_end_game_stats', payloadSocket)
        }
        // send_end_game_stats
      }
    })()
  }, [teamWon])

  useEffect(() => {
    const payload = {
      scoreA: info.team1.score,
      scoreB: info.team2.score,
      gameId,
    }
    if (socket) {
      socket.emit('set_change_score_set', payload)
    }

  }, [info.team2.score, info.team1.score])
  useEffect(() => {
    if (breakTime === 2 || breakTime === 3) {
      const startingMinute = breakTime - 1;
      let time = (startingMinute * 60) - 1;
      let seconds = time % 60;
      let minutes = Math.floor(time / 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      setTimer(`${minutes}:${seconds}`);
      const interval = setInterval(() => {
        time--;
        seconds = time % 60;
        minutes = Math.floor(time / 60);
        if (minutes === 0 && seconds < 23 && seconds > 19)
          setTwentySeconds(true)
        else
          setTwentySeconds(false)
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        setTimer(`${minutes}:${seconds}`);
      }, 1000);
      const countDown = setTimeout(() => {
        if (breakTime !== 0) setBreakTime(0);
      }, (breakTime - 1) * 60000);
      return () => {
        clearInterval(interval);
        clearTimeout(countDown);
        setDisable(false);
        if (info.team1.players.length > 1 && breakTime === 3)
          setChooseServer(true);
      }
    }
  }, [breakTime]);
  useEffect(() => {
    if (warmUp) {
      const startingMinute = 2;
      let time = (startingMinute * 60) - 1;
      let seconds = time % 60;
      let minutes = Math.floor(time / 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      setWarmUpTimer(`${minutes}:${seconds}`);
      const interval = setInterval(() => {
        time--;
        seconds = time % 60;
        minutes = Math.floor(time / 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        setWarmUpTimer(`${minutes}:${seconds}`);
      }, 1000);
      const countDown = setTimeout(() => {
        if (warmUp) setWarmUp(false);
      }, (2) * 60000);
      return () => {
        clearInterval(interval);
        clearTimeout(countDown);
      }
    }
  }, [warmUp]);

  useEffect(() => {
    (async () => {
      if (info.events.length > 0 && (info.events[info.events.length - 1].content === 'Dis' || info.events[info.events.length - 1].content === 'Ret')) {
        let teamWon = 'team1';
        info.team1.players.forEach(player => {
          if (player.id === info.events[info.events.length - 1].by) teamWon = 'team2';
        })
        setTeamWon(teamWon);
        setWinPoint(null)
        setOver({ teamKey: teamWon, isForce: true });
        setDisable(true);
        setHalfTime(false);
        setMaxPoint(21);
        const payload = {
          id: gameId,
          status: 3,
          shuttls: info.balls
        }
        const result = await setStatusGame(payload, token)
        if (result.success) {
          setDisable(true)
        } else {
          setDialog(null)
          setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }
        let payloadSet = {
          setId,
          events: info.events,
          teamA: { score: info.team1.score, setWon: false },
          teamB: { score: info.team2.score, setWon: false }
        }
        let resultEnd = await endSetHandler(payloadSet, token)
        let payloadSocket = {
          teamA: info.team1.scores,
          teamB: info.team2.scores,
          gameId,
        }
        socket.emit('send_end_game_stats', payloadSocket)
      }
    })()
  }, [info.events])

  // useEffect(() => {
  //   if (serviceOver || winPoint) {
  //     setFlashEffect("flash")
  //     const flashTimer = setTimeout(() => {
  //       setFlashEffect("")
  //     }, 1000);
  //     return () => {
  //       clearTimeout(flashTimer)
  //     }
  //   }
  // }, [serviceOver, winPoint])

  return (
    <div
      className="scoreboard-container"
      style={{
        color: theme.on_primary,
      }}
    >
      {dialog}
      <div className={`background`} >
        <div className="rotate-screen">
          <img src={rotate} alt="rotate-phone" />
          {stringFa.rotate_screen_error}
        </div>
      </div> {/* ${flashEffect}*/}
      {eventPicker && <Modal show={eventPicker} modalClosed={() => setEventPicker(false)}>
        <Events setClose={setEventPicker} />
        <Button onClick={() => setEventPicker(false)}>انصراف</Button>
      </Modal>}
      {(teamWon === "team1" || teamWon === "team2") &&
        <Modal show={(teamWon === "team1" || teamWon === "team2") && true} modalClosed={() => console.log("")}>
          <WinnerModal teamWon={teamWon} />
        </Modal>}
      {chooseServer && <Modal show={chooseServer} >
        <Selector setShow={setChooseServer} selectedGame={gameId} />
      </Modal>}

      <div className={`main-scoreboard ${info.team1.isRightTeam && "reverse"}`}
        style={{
          alignItems: loading && "center"
        }}
      >
        {!loading &&
          (info ? (info.team1.players.length > 0 && info.team2.players.length > 0) ?
            Object.entries(info).map(([k, v], index) =>
              (k === "team1" || k === "team2") &&
              (<PlayerBlock
                disable={disable}
                key={k}
                player={v.players[0]}
                playerD={v.players[1] && v.players[1]}
                setWon={v.setWon}
                score={v.score}
                scores={v.scores}
                server={v.server}
                receiver={v.receiver}
                position={v.isRightTeam ? "right" : "left"}
                teamKey={k}
                setServiceOver={setServiceOver}
              />)
            ) : <Loading style={{ direction: "ltr" }} />
            : <Loading style={{ direction: "ltr" }} />)}
        {!disable && <div className="service-over"
          style={{ opacity: serviceOver ? 1 : 0 }}
        >service over</div>}
        <div className="service-over"
          style={{ opacity: twentySeconds ? 1 : 0, direction: "ltr" }}
        >20 seconds</div>
        <div className="win-point"
          style={{ opacity: winPoint ? 1 : 0 }}
        >{winPoint}</div>
        {disable && breakTime === 0 && (
          loading ? <Loading style={{ direction: "ltr" }} /> :
            <>
              {!warmUp && <div className="warm-up" onClick={() => setWarmUp(true)}>!Warm Up</div>}
              {warmUp && <div className="timer" >{warmUpTimer}
                {disable && <ImCancelCircle className="cancel-timer" color={theme.error}
                  onClick={() => setWarmUp(false)} />}
              </div>}
              <FaPlayCircle className="play" onClick={startTheGame} />
            </>
        )}
        {breakTime === 1 && <div className="break-btn" onClick={() => setBreakTime(2)}>Break</div>}
        {(breakTime === 2 || breakTime === 3) &&
          <div className={`break-timer ${twentySeconds && "alert"}`} >{timer}
            {disable && <ImCancelCircle className="cancel-timer" color={theme.error}
              onClick={() => setBreakTime(0)} />}
          </div>}
      </div>
      {/* <FooterScoreBoard /> */}
      {(!disable || breakTime !== 0) && (
        <div className="action-buttons"
          style={{ opacity: info.foulHappend ? 0 : 1, zIndex: info.foulHappend && -1 }}>
          <FaExclamation className="action-btn" style={{ color: theme.primary }}
            onClick={() => setEventPicker(true)} />
          <ImUndo2
            className="action-btn"
            style={{
              color: theme.primary,
              filter: info.events.length === 0 && "grayscale(10)"
            }}
            onClick={onUndoClickHandler} />
        </div>
      )}
    </div >
  );
};

export default ScoreBoard;
