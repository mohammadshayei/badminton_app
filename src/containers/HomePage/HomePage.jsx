import React from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "./AppBar/AppBar";

const HomePage = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="home-page-wrapper"
      style={{
        background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <AppBar />
    </div>
  );
};

export default HomePage;
