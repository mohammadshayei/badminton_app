import { useState } from "react";
import "./HeaderMainPage.scss";
// import { useTheme } from "../../../styles/ThemeProvider";
import Events from "../EventsModule/Events"
import { useSelector } from "react-redux";
import shuttle from "../../../assets/images/badminton_ball.png";

const HeaderMainPage = () => {
  // const themeState = useTheme();
  // const theme = themeState.computedTheme;
  const [show, setShow] = useState(false);
  const info = useSelector((state) => state.info);

  const eventsStyle = { color: "#fff", flexDirection: "row-reverse", flexWrap: "nowrap", alignItems: "center" }
  const eventStyle = { margin: "0.1rem 0.3rem", padding: "0 0.1rem" }
  const letterStyle = { fontSize: "1.75rem", padding: "0" }

  return (
    <div className={`header-main-container ${show && "show-header-main-container"}`}>
      <Events
        style={eventsStyle}
        eventStyle={eventStyle}
        letterStyle={letterStyle}
        hide={true}
      />
      <div className="ball" style={{ opacity: info.foulHappend ? 0 : 1 }}>
        {info.balls < 7 && [...Array(info.balls)].map((e, i) => (
          <img key={i} src={shuttle} alt="ball" />
        )
        )}
      </div>
      <div className="ball-counter" style={{ opacity: info.foulHappend ? 0 : 1 }}>{info.balls}</div>
      <div className="handle" onClick={() => setShow(!show)}></div>
    </div>
  );
};

export default HeaderMainPage;
