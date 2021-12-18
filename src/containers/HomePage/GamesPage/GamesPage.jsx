import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import { GoSettings } from "react-icons/go";
import Modal from "../../../components/UI/Modal/Modal"
import Selector from "./Selector/Selector";
import * as infoActions from "../../../store/actions/setInfo"
import { useDispatch } from "react-redux";

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const setScoreboard = (data) => {
    dispatch(infoActions.setScoreboardData(data));
  };

  useEffect(() => {
    setGames([
      ...games,
      {
        tournament: "مسابقات دهه فجر 1400",
        number: "5",
        type: "single",
        playerA1: "احمد حسنی",
        playerB1: "حمید کاظمی",
      },
      {
        tournament: "مسابقات دهه فجر 1400",
        number: "5",
        type: "double",
        playerA1: "احمد حسنی",
        playerA2: "مرتضی شکوری زاده",
        playerB1: "محمدحسن حسینی",
        playerB2: "حمید کاظمی"
      },
    ]);
  }, []);

  const gameClickHandler = (i) => {
    setScoreboard(games[i]);
    setShowModal(true);
  }

  return (
    <div className="games-page-wrapper">
      {showModal &&
        <Modal show={showModal} modalClosed={() => setShowModal(false)}>
          <Selector show={setShowModal} />
        </Modal>}
      {games.length > 0 ? (
        games.map((item, key) => (
          <div key={key} className="game-box" onClick={() => gameClickHandler(key)}>
            {item.type === "single" ? (
              <img src={rocket} alt="" />
            ) : (
              <img src={rockets} alt="" />
            )}
            <div className="details">
              <p className="title">{item.tournament}</p>
              <p className="game-number">{`${stringFa.game_number} ${item.number}`}</p>
              {<p className="players-name">
                {`${item.playerA1}
                 ${item.type === "double" ? "," + item.playerA2 : ""} - 
                 ${item.playerB1}
                 ${item.type === "double" ? "," + item.playerB2 : ""}`}
              </p>}
            </div>
            <GoSettings fontSize="1.5rem" />
          </div>
        ))
      ) : (
        <div className="hint">
          {stringFa.create_tournament}
          <img src={arrow} alt="arrow_down" />
        </div>
      )}
    </div>
  );
};

export default GamesPage;
