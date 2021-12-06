import React, { useState, useEffect } from "react";
import "./TournamentPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import arrow from "../../../assets/images/arrow.png";
import { stringFa } from "../../../assets/strings/stringFaCollection.js";
import Button from "../../../components/UI/Button/Button";
import { GoSettings } from "react-icons/go";
import reeferees from "../../../assets/images/reeferee.png"
import games from "../../../assets/images/games.png"
import courts from "../../../assets/images/court.png"
import players from "../../../assets/images/player.png"
import { getTournaments } from "../../../api/home";
import { useSelector } from "react-redux";

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false)
  const themeState = useTheme();
  const token = useSelector((state) => state.auth.token);
  const refereeId = useSelector((state) => state.auth.refereeId);


  const theme = themeState.computedTheme;
  useEffect(async () => {
    if (refereeId && token) {
      const result = await getTournaments(refereeId, token)
      if (result.success)
        setTournaments(result.data)
    }
  }, [refereeId, token])
  useEffect(() => {
    // setTournaments([
    //   ...tournaments,
    //   { title: "مسابقات دهه فجر 1400", progress: "60%" },
    //   { title: "مسابقات دهه فجر 1400", progress: "40%" },
    //   { title: "مسابقات دهه فجر 1400", progress: "0%" },
    //   { title: "مسابقات دهه فجر 1400", progress: "0%" },
    //   { title: "مسابقات دهه فجر 1400", progress: "0%" },
    // ]);
    setContent([
      ...content,
      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },
    ]);
  }, []);

  useEffect(() => {
    setContent([
      ...content,
      {
        p1Name: "علی",
        p1Score: "0",
        p2Name: "ممد",
        p2Score: "0",
        playing: false,
      },
      {
        p1Name: "علی",
        p1Score: "1",
        p2Name: "ممد",
        p2Score: "0",
        playing: true,
      },
    ]);
  }, [tournaments]);

  const onTournamentClick = (k) => {
    let updatedTournament = [...tournaments];
    updatedTournament.forEach((tour) => {
      tour.selected = false;
    });
    updatedTournament[k].selected = true;
    setTournaments(updatedTournament);
  };

  return (
    <div className="tour-page-container">
      <div
        className="box-container"
        style={{ backgroundColor: theme.background_color }}
      >
        <div className="box-content">
          {content.length > 0 &&
            content.map((item, key) => (
              <div
                key={key}
                className="content-container"
                style={{
                  background:
                    item.playing &&
                    `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
                  color: item.playing ? theme.on_primary : theme.on_background,
                  boxShadow:
                    item.playing &&
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                }}
              >
                <p>{`${item.p1Name} ${item.p1Score} - ${item.p2Score} ${item.p2Name}`}</p>
                <GoSettings />
              </div>
            ))}
        </div>
        <div className="box-btn">
          <Button>{stringFa.new_game}</Button>
        </div>
      </div>
      <div className="tournaments-wrapper">
        {tournaments.length > 0 ? (
          tournaments.map((item, key) => (
            <div
              key={key}
              className={`tournament-box ${item.selected && "selected"}`}
              style={{
                backgroundColor: item.selected && theme.background_color,
                color: item.selected && theme.on_background,
                boxShadow:
                  item.selected &&
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              }}
              onClick={() => onTournamentClick(key)}
            >
              <div
                className="progress"
                style={{ width: `${item.tournament.progress}` }}
              ></div>
              <p>{item.title}</p>
              {item.selected && (
                <div className="icons">
                  <img src={games} alt="" />
                  <img src={courts} alt="" />
                  <img src={reeferees} alt="" />
                  <img src={players} alt="" />
                  <GoSettings />
                </div>
              )}
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
