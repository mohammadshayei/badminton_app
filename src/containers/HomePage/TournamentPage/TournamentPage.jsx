import React, { useState, useEffect } from "react";
import "./TournamentPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import { BsThreeDots } from "react-icons/bs";

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    setTournaments([
      ...tournaments,
      { title: "مسابقات دهه فجر 1400", progress: "60%" },
      { title: "مسابقات دهه فجر 1400", progress: "40%" },
      { title: "مسابقات دهه فجر 1400", progress: "0%" },
      { title: "مسابقات دهه فجر 1400", progress: "0%" },
      { title: "مسابقات دهه فجر 1400", progress: "0%" },
    ]);
  }, []);

  return (
    <div className="tournaments-wrapper">
      {tournaments.length > 0 ? (
        tournaments.map((item, key) => (
          <div key={key} className="tournament-box">
            <div
              className="progress"
              style={{ width: `${item.progress}` }}
            ></div>
            <BsThreeDots />
            {item.title}
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

export default TournamentPage;
