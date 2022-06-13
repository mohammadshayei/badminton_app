import { useState } from "react";
import "./FooterMainPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import EventsBox from "./EventsBox/EventsBox";
import { IoCaretUp } from "react-icons/io5";

const FooterMainPage = () => {
  const [show, setShow] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className={`footer-main-container ${show && "show-footer-main-container"}`}
      style={{ color: theme.on_background }}
    >
      <EventsBox show={window.innerHeight > 630 ? "normal" : show} />
      <div className="handler" onClick={() => setShow(!show)}>
        <div className="handle-section">
          <IoCaretUp className="handle-icon" />
        </div>
      </div>
    </div>
  );
};

export default FooterMainPage;
