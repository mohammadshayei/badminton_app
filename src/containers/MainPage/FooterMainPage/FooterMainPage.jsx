import React from "react";
import "./FooterMainPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import EventsBox from "./EventsBox/EventsBox";

const FooterMainPage = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="footer-main-container"
      style={{ color: theme.on_background }}
    >
      <EventsBox />
    </div>
  );
};

export default FooterMainPage;
