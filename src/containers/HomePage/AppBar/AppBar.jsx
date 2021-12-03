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
      <div className="page-selector">
        <img
          src={tournament}
          alt=""
          onClick={() => setPageId(1)}
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50">
        <path
          d="M-301,746.871l1.521,0c37.128-.459,145.841-.453,168.479,0-53.945.374-44.583,46.128-85,45.16C-254.058,792.86-253.5,747.8-301,746.871Z"
          transform="translate(301 -746.533)"
          fill={theme.primary_variant}
        />
      </svg>
      <div className="page-selector">
        <img
          src={umpire}
          alt=""
          onClick={() => setPageId(2)}
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
