import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import { useSelector } from "react-redux";
import { getRefereeGames } from "../../../api/home";
import Loading from "../../../components/UI/Loading/Loading";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { useNavigate } from "react-router-dom";

const GamesPage = () => {
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState([]);
  const [dialog, setDialog] = useState(null)
  const token = useSelector(state => state.auth.token)
  const refereeId = useSelector(state => state.auth.refereeId)
  const navigate = useNavigate()
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
      setDialog(<ErrorDialog type="error">{stringFa.please_set_umpires}</ErrorDialog>)
      return;
    }
    if (refereeId && game._id) {
      navigate(`/scoreboard?gameId=${game._id}&refereeId=${refereeId}`)
    }
  }

  return (
    <div className="games-page-wrapper">
      {dialog}

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
                  <div title={item.game.tournament.title} className="title">{item.game.tournament.title}</div>
                  <p className="game-number">{`game ${item.game.game_number}  -  court ${item.game.land_number}`}</p>
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
              {stringFa.no_game_to_see}
            </div>
          )
      }

    </div>
  );
};

export default GamesPage;
