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

const ScoreBoard = () => {
  const [eventPicker, setEventPicker] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [halfTime, setHalfTime] = useState(false);
  const [disable, setDisable] = useState(true);
  const [maxPoint, setMaxPoint] = useState(21);
  const [teamWon, setTeamWon] = useState(null);
  const [loading, setLoading] = useState(false)
  const [endSetRequestSended, setEndSetRequestSended] = useState(false)
  const [gameStarted, setGameStarted] = useState(false);
  const [chooseServer, setChooseServer] = useState(false);

  const gameId = useSelector(state => state.gameInfo.gameId)
  const game = useSelector(state => state.gameInfo.gameReferee)
  const setId = useSelector(state => state.info._id)
  const token = useSelector(state => state.auth.token)
  const socket = useSelector(state => state.auth.socket)
  const info = useSelector((state) => state.info);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const setOver = (teamKey) => {
    dispatch(infoActions.setOver(teamKey));
  };
  const setSetId = (id) => {
    dispatch(infoActions.setSetId(id));
  };
  const switchSide = () => {
    dispatch(infoActions.switchSide());
  };
  const removeEventFromStack = () => {
    if (info.events[info.events.length - 1].type === 'score') {
      if ((info.team1.score === 10 && info.team2.score <= 10) || (info.team2.score === 10 && info.team1.score <= 10))
        setBreakTime(0)
      if ((info.team1.score === 11 && info.team2.score <= 11) || (info.team2.score === 11 && info.team1.score <= 11))
        setBreakTime(1)
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

  const startTheGame = async () => {
    setLoading(true)
    const payload = {
      gameId,
      gameStatus: 2,
      setId,
      setStatus: 2
    }
    const result = await setGameAndSetStatus(payload, token)
    if (result.success) {
      setDisable(false)
      setGameStarted(true)
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  const createNewSet = async () => {
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
      alert(resultCreateSet.error)
    }
  }
  const endSet = async (teamName) => {
    //balls , score and setwon in team ,events 
    if (socket) {
      socket.emit('set_winner_team', { teamName, gameId })
    }
    let payload = {
      setId,
      balls: info.balls,
      events: info.events,
      teamA: { score: info.team1.score, setWon: teamName === 'team1' ? true : false },
      teamB: { score: info.team2.score, setWon: teamName === 'team2' ? true : false }
    }
    let resultEnd = await endSetHandler(payload, token)
    if (resultEnd.success) {
      setEndSetRequestSended(true)
      // setDisable(true)
    } else {
      alert(resultEnd.error)
    }
  }
  const onUndoClickHandler = () => {
    if (info.events.length > 0) {
      removeEventFromStack()
    }
  }
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
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, []);

  useEffect(() => {
    switch (info.team1.score) {
      case maxPoint - 1:
        if (info.team2.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setOver({ teamKey: "team1" });
        switchSide();
        setDisable(true);
        setBreakTime(3);
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
  }, [info.team1.score])
  useEffect(() => {
    switch (info.team2.score) {
      case maxPoint - 1:
        if (info.team1.score === maxPoint - 1 && maxPoint < 30) {
          setMaxPoint(maxPoint + 1);
        }
        break;
      case maxPoint:
        setOver({ teamKey: "team2" });
        switchSide();
        setDisable(true);
        setBreakTime(3);
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
  }, [info.team2.score])

  useEffect(async () => {
    if ((info.team1.setWon !== 0 || info.team2.setWon !== 0) &&
      (info.team1.setWon !== 2 && info.team2.setWon !== 2) && endSetRequestSended) {
      createNewSet()
      setEndSetRequestSended(false)
    }
    if (info.team1.setWon === 2)
      setTeamWon("team1");
    else if (info.team2.setWon === 2)
      setTeamWon("team2");
  }, [info.team1.setWon, info.team2.setWon, endSetRequestSended]);

  useEffect(async () => {
    if (teamWon === 'team1' || teamWon === 'team2') {
      const payload = {
        id: gameId,
        status: 3,
      }
      const result = await setStatusGame(payload, token)
      if (result.success) {
        setDisable(true)
      } else {
        alert(result.error)
      }

    }
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
  return (
    <div
      className="scoreboard-container"
      style={{
        color: theme.on_primary,
      }}
    >
      <div className="background" />
      <Modal show={eventPicker} modalClosed={() => setEventPicker(false)}>
        <Events setClose={setEventPicker} />
        <Button onClick={() => setEventPicker(false)}>انصراف</Button>
      </Modal>
      <Modal show={(teamWon === "team1" || teamWon === "team2") && true} modalClosed={() => setTeamWon(null)}>
        <WinnerModal teamWon={teamWon} />
      </Modal>
      <Modal show={chooseServer} >
        <Selector setShow={setChooseServer} selectedGame={gameId} />
      </Modal>
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
              />)
            ) : <Loading style={{ direction: "ltr" }} />
            : <Loading style={{ direction: "ltr" }} />)}
        {/* <div className="warm-up">Warm Up!</div> */}
        {disable && breakTime === 0 && (
          loading ? <Loading style={{ direction: "ltr" }} /> : <FaPlayCircle className="play" onClick={startTheGame} />
        )
        }
        {breakTime === 1 && <div className="break-btn" onClick={() => setBreakTime(2)}>Break</div>}
        {(breakTime === 2 || breakTime === 3) &&
          <div className="break-timer" >{timer}
            <ImCancelCircle className="cancel-timer" color={theme.error}
              onClick={() => setBreakTime(0)} />
          </div>}
      </div>
      {/* <FooterScoreBoard /> */}
      <div disabled={disable} className="action-buttons"
        style={{ opacity: info.foulHappend ? 0 : 1, zIndex: info.foulHappend && -1 }}>
        <FaExclamation className="action-btn" style={{ color: theme.primary }} onClick={() => setEventPicker(true)} />
        <ImUndo2
          className="action-btn"
          style={{
            color: theme.primary,
            filter: info.events.length === 0 && "grayscale(10)"
          }}
          onClick={onUndoClickHandler} />
      </div>
    </div >
  );
};

export default ScoreBoard;
