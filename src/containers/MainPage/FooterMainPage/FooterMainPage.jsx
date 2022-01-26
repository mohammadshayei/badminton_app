import { useState } from "react";
import "./FooterMainPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import EventsBox from "./EventsBox/EventsBox";

const FooterMainPage = () => {
  const [show, setShow] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className={`footer-main-container ${show && "show-footer-main-container"}`}
      style={{ color: theme.on_background }}
    >
      <EventsBox />
      <div className="handle" onClick={() => setShow(!show)}></div>
    </div>
  );
};

export default FooterMainPage;
