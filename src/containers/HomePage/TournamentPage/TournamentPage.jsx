import React, { useState, useEffect } from "react";
import "./TournamentPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import Button from "../../../components/UI/Button/Button";
import { BsThreeDots } from "react-icons/bs";

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [content, setContent] = useState([]);
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
    setContent([
      ...content,
      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },

      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },
    ]);
  }, []);

  return (
    <div className="tour-page-container">
      <div
        className="box-container"
        style={{ backgroundColor: theme.background_color }}
      >
        <div className="box-content">
          {content.length > 0 &&
            content.map((item, key) => (
              <div key={key} className="content-container">
                <BsThreeDots />
                <p>{`${item.p1Name} ${item.p1Score} - ${item.p2Score} ${item.p2Name}`}</p>
              </div>
            ))}
        </div>
        <div className="box-btn">
          <Button>{stringFa.add_game}</Button>
        </div>
      </div>
      <div className="tournaments-wrapper">
        {tournaments.length > 0 ? (
          tournaments.map((item, key) => (
            <div key={key} className="tournament-box">
              <div
                className="progress"
                style={{ width: `${item.progress}` }}
              ></div>
              <BsThreeDots />
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <div className="hint">
            {stringFa.create_tournament}
            <img src={arrow} alt="arrow_down" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentPage;
