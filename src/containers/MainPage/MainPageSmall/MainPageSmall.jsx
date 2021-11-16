import React from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./MainPageSmall.scss";

const MainPageSmall = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="main-container"
      style={{ backgroundColor: theme.background_color }}
    >
      MainPageSmall
    </div>
  );
};

export default MainPageSmall;
