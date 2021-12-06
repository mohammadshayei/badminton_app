import React, { useState } from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "./AppBar/AppBar";
import TournamentPage from "./TournamentPage/TournamentPage";

const HomePage = () => {
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(<TournamentPage />);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const menuButonClickHandler = () => setClicked(!clicked);

  return (
    <div
      className="home-page-wrapper"
      style={{
        background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <div className="menu-icon" onClick={menuButonClickHandler}>
        <i
          style={{ color: theme.on_primary }}
          className={clicked ? "fas fa-times" : "fas fa-bars"}
        />
      </div>
      {page}
      <AppBar setPage={setPage} />
    </div>
  );
};

export default HomePage;
