import React, { useState, useEffect } from "react";
import "./AppBar.scss";
import umpire from "../../../assets/images/umpire.png";
import tournament from "../../../assets/images/tournament.png";
import { MdAdd } from "react-icons/md";
import { useTheme } from "../../../styles/ThemeProvider";
import TournamentPage from "../TournamentPage/TournamentPage";
import GamesPage from "../GamesPage/GamesPage";

const AppBar = (props) => {
  const [pageId, setPageId] = useState(1);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    switch (pageId) {
      case 1:
        props.setPage(<TournamentPage />);
        break;
      case 2:
        props.setPage(<GamesPage />);
        break;
      default:
        props.setPage(<TournamentPage />);
        break;
    }
  }, [pageId]);

  return (
    <div className="app-bar">
      <div className="page-selector" onClick={() => setPageId(1)}>
        <img
          src={tournament}
          alt=""
          style={{
            filter: pageId === 1 ? "grayscale(0%)" : "grayscale(100%)",
            opacity: pageId === 1 ? "1" : "0.5",
          }}
        />
      </div>
      <div
        className="add-tournament"
        style={{
          background: theme.background_color,
          color: theme.primary,
        }}
      >
        <MdAdd />
      </div>

      <div className="page-selector" onClick={() => setPageId(2)}>
        <img
          src={umpire}
          alt=""
          style={{
            filter: pageId === 2 ? "grayscale(0%)" : "grayscale(100%)",
            opacity: pageId === 2 ? "1" : "0.5",
          }}
        />
      </div>
    </div>
  );
};

export default AppBar;
