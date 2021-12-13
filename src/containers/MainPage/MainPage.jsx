import React, { useState } from "react";
import "./MainPage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import FooterMainPage from "./FooterMainPage/FooterMainPage";
import HeaderMainPage from "./HeaderMainPage/HeaderMainPage";

const MainPage = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="main-page-container"
      style={{ backgroundColor: theme.background_color }}
    >
      <HeaderMainPage />
      <ScoreBoard />
      {/* <FooterMainPage /> */}
    </div>
  );
};

export default MainPage;
