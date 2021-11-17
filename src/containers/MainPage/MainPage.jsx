import React from "react";
import HeaderMainLarge from "../../components/Header/HeaderMain/HeaderMainLarge/HeaderMainLarge";
import { useTheme } from "../../styles/ThemeProvider";
import "./MainPage.scss";

const MainPage = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="main-container"
      style={{ backgroundColor: theme.background_color }}
    >
      <HeaderMainLarge />
    </div>
  );
};

export default MainPage;
