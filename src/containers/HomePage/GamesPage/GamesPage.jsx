import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import Modal from "../../../components/UI/Modal/Modal"
import Selector from "./Selector/Selector";
import * as infoActions from "../../../store/actions/setInfo"
import * as gameActions from "../../../store/actions/gameInfo"

import { useDispatch, useSelector } from "react-redux";
import { getRefereeGames } from "../../../api/home";
import Loading from "../../../components/UI/Loading/Loading";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";

const GamesPage = () => {
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dialog, setDialog] = useState(null)
  const token = useSelector(state => state.auth.token)
  const refereeId = useSelector(state => state.auth.refereeId)
  const gameId = useSelector(state => state.gameInfo.gameId)

  const dispatch = useDispatch();
  const setScoreboard = (data) => {
    dispatch(infoActions.setScoreboardData(data));
  };
  const setGameId = (id) => {
    dispatch(gameActions.setGameId(id));
  };
  const setSelectedGameReferee = (game) => {
    dispatch(gameActions.setGameReferee(game));
  };
  useEffect(async () => {
    setLoading(true)
    const result = await getRefereeGames({ id: refereeId }, token)
    if (result.success) {
      setGames(result.data)
    } else {
      setDialog(null)
      setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
    }
    setLoading(false)
  }, [])

  const gameClickHandler = (i) => {
    let game = games.find(item => item.game._id === i).game
    if (!game.referee || !game.service_referee) {
      alert(stringFa.please_set_referees)
      return;
    }
    setScoreboard(game);
    setSelectedGameReferee(game)
    setGameId(game._id)
    setShowModal(true);
  }

  return (
    <div className="games-page-wrapper">
      {dialog}
      <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <Selector exitable={true} show={setShowModal} selectedGameId={gameId} />
      </Modal>
      {
        loading ?
          <Loading /> :
          games.length > 0 ? (
            games.map((item, key) => (
              <div key={item.game._id} className="game-box" onClick={() => gameClickHandler(item.game._id)}>
                {item.game.game_type === "single" ? (
                  <img src={rocket} alt="" />
                ) : (
                  <img src={rockets} alt="" />
                )}
                <div className="details">
                  <p className="title">{item.game.tournament.title}</p>
                  <p className="game-number">{`${stringFa.game_number} ${item.game.game_number}`}</p>
                  {<p className="players-name">
                    {`${item.game.teamA.players[0].player.username}
                   ${item.game.game_type === "double" ? "," + item.game.teamA.players[1].player.username : ""} - 
                   ${item.game.teamB.players[0].player.username}
                   ${item.game.game_type === "double" ? "," + item.game.teamB.players[1].player.username : ""}`}
                  </p>}
                </div>
              </div>
            ))
          ) : (
            <div className="hint">
              {stringFa.create_tournament}
              <img src={arrow} alt="arrow_down" />
            </div>
          )
      }

    </div>
  );
};

export default GamesPage;
