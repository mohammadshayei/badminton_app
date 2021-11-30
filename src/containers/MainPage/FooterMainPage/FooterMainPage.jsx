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
      <div className="detail-box">خطاها</div>
      <div className="detail-box">
        <EventsBox />
      </div>
      <div className="detail-box">داورها</div>
    </div>
  );
};

export default FooterMainPage;
