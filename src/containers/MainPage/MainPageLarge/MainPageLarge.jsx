import React from "react";
import HeaderMainLarge from "../../../components/Header/HeaderMain/HeaderMainLarge/HeaderMainLarge";
import { useTheme } from "../../../styles/ThemeProvider";
import "./MainPageLarge.scss";
import ScoreBoardLarge from "./ScoreBoardLarge/ScoreBoardLarge";

const MainPageLarge = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="main-large-container"
      style={{ backgroundColor: theme.background_color }}
    >
      <HeaderMainLarge />
      <ScoreBoardLarge />
    </div>
  );
};

export default MainPageLarge;
