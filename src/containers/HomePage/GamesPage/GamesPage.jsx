import React, { useState, useEffect } from "react";
import "./GamesPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { BsThreeDots } from "react-icons/bs";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    setGames([
      ...games,
      {
        tournament: "مسابقات دهه فجر 1400",
        number: "5",
        type: "single",
        player1: "تقی",
        player2: "حسن",
      },
      {
        tournament: "مسابقات دهه فجر 1400",
        number: "5",
        type: "single",
        player1: "تقی",
        player2: "حسن",
      },
      {
        tournament: "مسابقات دهه فجر 1400",
        number: "5",
        type: "single",
        player1: "تقی",
        player2: "حسن",
      },
    ]);
  }, []);

  return (
    <div className="games-page-wrapper">
      {games.length > 0 ? (
        games.map((item, key) => (
          <div key={key} className="game-box">
            {item.type === "single" ? (
              <img src={rocket} alt="" />
            ) : (
              <img src={rockets} alt="" />
            )}
            <div className="details">
              <p className="title">{item.tournament}</p>
              <p className="game-number">{`${item.number} ${stringFa.game_number}`}</p>
              <p className="players-name">{`${item.player1} - ${item.player2}`}</p>
            </div>
            <BsThreeDots />
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
