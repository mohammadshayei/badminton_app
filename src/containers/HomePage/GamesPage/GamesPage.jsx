import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { useSelector } from "react-redux";
import { getRefereeGames } from "../../../api/home";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import Ads from "../../../assets/images/IranBadmintonFederation.jpg";
import Ads2 from "../../../assets/images/IranBadmintonFederation2.jpg";
import { GiTennisCourt } from "react-icons/gi";
import Skeleton from 'react-loading-skeleton'

const GamesPage = () => {
  const [loading, setLoading] = useState(false)
  const [games, setGames] = useState([]);
  const [dialog, setDialog] = useState(null)
  const [lives, setLives] = useState([])

  const themeState = useTheme();
  const theme = themeState.computedTheme;

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
    <div className="games-page">
      {dialog}
      {
        lives.length > 0 &&
        <div className="live-scores-bar"
          style={{
            display: "flex",
            backgroundColor: theme.secondary_variant,
            color: theme.on_secondary
          }}
        >
          {
            lives.map(item =>
              <div className="live-score-item">
                <Icon className="live-icon" icon="fluent:live-24-regular" color={theme.on_primary} />
                <p>{item.title}</p>
              </div>
            )
          }

        </div>
      }
      <p className="title">{stringFa.my_games}</p>
      <div className="games-and-ads">
        <div className="games-wrapper">
          <div className="ads-container">
            <img src={Ads2} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
          </div>
          {
            loading ?
              <div
                className="game-box"
                style={{
                  backgroundColor: theme.surface
                }}
              >
                <div className="game-box-title"
                  style={{
                    backgroundColor: theme.border_color
                  }}
                >
                  <Skeleton
                    className="game-box-title-text"
                    direction='rtl'
                    baseColor={theme.border_color}
                    width={250}
                    highlightColor={theme.border_color}
                  />
                </div>
                <div className="game-box-details">
                  <div className="game-box-players">
                    <Skeleton
                      className="game-box-players-name"
                      direction='rtl'
                      baseColor={theme.border_color}
                      width={150}
                      highlightColor={theme.border_color}
                    />
                    <Skeleton
                      className="game-box-players-name"
                      direction='rtl'
                      baseColor={theme.border_color}
                      width={150}
                      highlightColor={theme.border_color}
                    />
                  </div>
                </div>
              </div>
              :
              games.length > 0 ? (
                games.map((item, key) => (
                  <div
                    className="game-box"
                    key={item.game._id}
                    onClick={() => gameClickHandler(item.game._id)}
                    style={{
                      backgroundColor: theme.surface
                    }}
                  >
                    <div className="game-box-title"
                      style={{
                        backgroundColor: theme.border_color
                      }}
                    >
                      <p className="game-box-title-text" title={item.game.tournament.title}>{item.game.tournament.title}</p>
                      <div className="game-number-and-court">
                        <p
                          style={{ color: theme.secondary }}
                        >
                          {item.game.land_number}
                        </p>
                        <GiTennisCourt color={theme.secondary} />
                        <p className="game-box-game-number">
                          {item.game.game_number}
                        </p>
                      </div>
                    </div>
                    <div className="game-box-details">
                      {<div className="game-box-players">
                        <div className="game-box-players-name">
                          <span>{item.game.teamA.players[0].player.username}</span>
                          <span>{item.game.game_type === "double" && item.game.teamA.players[1].player.username}</span>
                        </div>
                        <span> - </span>
                        <div className="game-box-players-name">
                          <span>{item.game.teamB.players[0].player.username}</span>
                          <span>{item.game.game_type === "double" && item.game.teamB.players[1].player.username}</span>
                        </div>
                      </div>}
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
        <div className="ads-container">
          <img src={Ads} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
