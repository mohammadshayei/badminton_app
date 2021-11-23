import React, { useState } from "react";
import "./MainPage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import FooterMainPage from "./FooterMainPage/FooterMainPage";
import HeaderMainPage from "./HeaderMainPage/HeaderMainPage";

const MainPage = () => {
  const [clicked, setClicked] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const menuButonClickHandler = () => setClicked(!clicked);

  return (
    <div
      className="main-page-container"
      style={{ backgroundColor: theme.background_color }}
    >
      <div className="menu-icon" onClick={menuButonClickHandler}>
        <i
          style={{ color: theme.on_primary }}
          className={clicked ? "fas fa-times" : "fas fa-bars"}
        />
      </div>
      <HeaderMainPage />
      <ScoreBoard />
      <FooterMainPage />
    </div>
  );
};

export default MainPage;
