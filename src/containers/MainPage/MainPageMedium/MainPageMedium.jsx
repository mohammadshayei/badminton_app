import React from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./MainPageMedium.scss";

const MainPageMedium = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="main-container"
      style={{ backgroundColor: theme.background_color }}
    >
      MainPageMedium
    </div>
  );
};

export default MainPageMedium;
