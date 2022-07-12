/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./MainPage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import FooterMainPage from "./FooterMainPage/FooterMainPage";
import HeaderMainPage from "./HeaderMainPage/HeaderMainPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../store/actions/setInfo"
import * as gameActions from "../../store/actions/gameInfo"
import Selector from "../HomePage/GamesPage/Selector/Selector";
import Modal from "../../components/UI/Modal/Modal";
import { dynamicApi } from "../../api/home";
import ErrorDialog from "../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../assets/strings/stringFaCollection";
import Loading from './../../components/UI/Loading/Loading';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [dialog, setDialog] = useState(null)
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(true);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const locaiton = useLocation();
  const navigate = useNavigate()
  const info = useSelector((state) => state.info);
  const { token, socket } = useSelector(state => state.auth)
  const searchParams = new URLSearchParams(locaiton.search);
  const gameId = searchParams.get("gameId");
  const refereeId = searchParams.get("refereeId");
  const court = searchParams.get("court");
  const gym = searchParams.get("gym");

  const dispatch = useDispatch();
  const setScoreboard = (data) => {
    dispatch(infoActions.setScoreboardData(data));
  };
  const setupEmptySetOnScoreboard = (data) => {
    dispatch(infoActions.setupEmptySetOnScoreboard(data));
  };
  const changeReadyStatus = (status) => {
    dispatch(infoActions.changeReadyStatus(status));
  };
  const setupMidStageSetOnScoreboard = (data) => {
    dispatch(infoActions.setupMidStageSetOnScoreboard(data));
  };
  const cleanupSet = () => {
    dispatch(infoActions.cleanupInfo());
  };
  const setGameId = (id) => {
    dispatch(gameActions.setGameId(id));
  };
  const setSelectedGameReferee = (game) => {
    dispatch(gameActions.setGameReferee(game));
  };
  const initiateScorboard = (game) => {
    if (game.sets.length > 0 && game.sets[game.sets.length - 1].status !== 3) {
      const lastSet = game.sets[game.sets.length - 1].set;
      let detailteamA = {
        scores: [],
        setWon: 0
      }
      let detailteamB = {
        scores: [],
        setWon: 0
      }
      let totalEvents = []
      if (game.sets.length > 1) {
        game.sets.forEach(item => {
          if (item.set.status === 3) {
            if (item.set.teamA.setWon) detailteamA = { ...detailteamA, setWon: detailteamA.setWon + 1 }
            else if (item.set.teamB.setWon) detailteamB = { ...detailteamB, setWon: detailteamB.setWon + 1 }
            detailteamA = { ...detailteamA, scores: [...detailteamA.scores, item.set.teamA.score] }
            detailteamB = { ...detailteamB, scores: [...detailteamB.scores, item.set.teamB.score] }
          }
          totalEvents = [...totalEvents, item.set.events]
        })
      }
      if (lastSet.events.length > 0) {
        const payload = {
          teamA: lastSet.mid_game.teamA,
          teamB: lastSet.mid_game.teamB,
          shuttle: lastSet.mid_game.shuttle,
          events: lastSet.events,
          initTeamA: {
            server: lastSet.teamA.server,
            receiver: lastSet.teamA.receiver,
          },
          initTeamB: {
            server: lastSet.teamB.server,
            receiver: lastSet.teamB.receiver,
          },
          detailteamA,
          detailteamB,
          totalEvents,
          setId: lastSet._id
        }
        setupMidStageSetOnScoreboard(payload)
        setDisable(false)
      } else {
        const payload = {
          teamA: lastSet.teamA,
          teamB: lastSet.teamB,
          _id: lastSet._id
        }
        setupEmptySetOnScoreboard(payload)
      }
    } else {
      setShowModal(true);
    }
    changeReadyStatus(true)
  }
  useEffect(() => {
    (async () => {
      if (gameId) {
        setLoading(true)
        const result = await dynamicApi({ gameId }, token, 'check_user_get_game')
        if (result.success) {
          setScoreboard(result.data.game);
          setSelectedGameReferee(result.data.game)
          setGameId(result.data.game._id)
          initiateScorboard(result.data.game)
          // setShowModal(true);
        } else {
          setDialog(null)
          setDialog(<ErrorDialog type="error">{result.message}</ErrorDialog>)
          setTimeout(() => {
            if (gym && court)
              navigate(`/my_games?gym=${gym}&court=${court}`)
            else if (gym)
              navigate(`/my_games?gym=${gym}`)
            else
              navigate(`/my_games`)
          }, 3000);
        }
        setLoading(false)
      }
      else {
        setDialog(<ErrorDialog type="error">{stringFa.url_wrong}</ErrorDialog>)
        setTimeout(() => {
          if (gym && court)
            navigate(`/my_games?gym=${gym}&court=${court}`)
          else if (gym)
            navigate(`/my_games?gym=${gym}`)
          else
            navigate(`/my_games`)
        }, 3000);
      }
    })()


  }, [gameId]);

  useEffect(() => {
    cleanupSet()
    return () => {
      changeReadyStatus(false)
    }
  }, [])

  useEffect(() => {
    if (socket && info._id && info.readyForSendData) {
      let payload = {
        teamA: {
          isRightTeam: info.team1.isRightTeam,
          score: info.team1.score,
          server: info.team1.server,
          receiver: info.team1.receiver,
          isTop: info.team1.isTop,
        },
        teamB: {
          isRightTeam: info.team2.isRightTeam,
          score: info.team2.score,
          server: info.team2.server,
          receiver: info.team2.receiver,
          isTop: info.team2.isTop,
        },
        shuttle: info.balls,
        setId: info._id,
      }
      if (!info.undoMode) {
        payload = {
          ...payload,
          events: info.events,
        }
      } else {
        let updatedEvents = [...info.events];
        updatedEvents.pop();
        payload = {
          ...payload,
          events: updatedEvents
        }
      }
      try {
        socket.emit('set_change_event_set', payload)
      } catch (error) {
        console.log(error)
      }
    }
  }, [socket, info.eventCounter])

  return (
    <div
      className="main-page-container"
    // style={{ backgroundColor: theme.background_color }}
    >
      {dialog}
      {showModal && <Modal show={showModal} modalClosed={() => console.log("")}>
        <Selector exitable={true} setShow={setShowModal} selectedGameId={gameId} />
      </Modal>}
      {loading ?
        <Loading style={{ color: theme.on_primary }} />
        :
        <>
          <HeaderMainPage />
          <ScoreBoard disable={disable} setDisable={setDisable} />
          <FooterMainPage />
        </>
      }

    </div>
  );
};

export default MainPage;
