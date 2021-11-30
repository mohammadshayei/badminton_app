import React from "react";
import "./HeaderMainPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";

const HeaderMainPage = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const themeStyle = {
    background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
    color: theme.on_primary,
  };

  return (
    <div className="header-main-container">
      <div className="team-name" style={themeStyle}>
        تیم شماره 1
      </div>
      <div className="timer" style={{ color: theme.primary }}>
        09:28
      </div>
      <div className="team-name" style={themeStyle}>
        تیم شماره 2
      </div>
    </div>
  );
};

export default HeaderMainPage;
