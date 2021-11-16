import React from "react";
import Button from "../../components/Button/Button";
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
      mainpage
    </div>
  );
};

export default MainPage;
