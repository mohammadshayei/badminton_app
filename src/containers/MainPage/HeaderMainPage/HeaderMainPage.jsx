import { useEffect, useState } from "react";
import "./HeaderMainPage.scss";
// import { useTheme } from "../../../styles/ThemeProvider";
import Events from "../EventsModule/Events"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/UI/Button/Button"
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";
import { exitGame } from "../../../api/scoreboard";
import { useNavigate } from "react-router-dom";
import * as infoActions from "../../../store/actions/setInfo"

const HeaderMainPage = () => {
  // const themeState = useTheme();
  // const theme = themeState.computedTheme;
  const token = useSelector(state => state.auth.token)
  const gameId = useSelector(state => state.gameInfo.gameId)
  const socket = useSelector(state => state.auth.socket)

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();
  const increaseBall = () => {
    dispatch(infoActions.increaseBall());
  };

  const eventsStyle = { color: "#fff", flexDirection: "row-reverse", flexWrap: "nowrap", alignItems: "center" }
  const eventStyle = { margin: "0.1rem 0.3rem", padding: "0 0.1rem" }
  const letterStyle = { fontSize: "1.75rem", padding: "0" }
  const onExit = () => {
    exitGame({ id: gameId }, token)
    if (socket) {
      socket.emit('send_exit_game', { gameId })
    }
    navigate('/home')
  }

  useEffect(() => {
    if (info.team1.players.length > 1)
      increaseBall();
  }, []);
  

  return (
    <div className={`header-main-container ${show && "show-header-main-container"}`}>
      <Events
        style={eventsStyle}
        eventStyle={eventStyle}
        letterStyle={letterStyle}
        hide={true}
      />
      {/* <div className="ball" style={{ opacity: info.foulHappend ? 0 : 1 }}>
        {info.balls < 7 ? [...Array(info.balls)].map((e, i) => (
          <img key={i} src={shuttle} alt="ball" />)) :
          <img src={shuttle} alt="ball" />}
      </div> */}
      <div>
        <Button
          onClick={onExit}
          ButtonStyle={{
            fontSize: '1.2rem',
            height: "6vh",
            marginRight: "2rem",
            padding: '.4rem 2rem',
            background: theme.error,
            color: theme.on_error,
          }}
        >
          {stringFa.exit}
        </Button>
      </div>
      <div className="ball-counter" style={{ opacity: info.foulHappend ? 0 : 1 }}>{info.balls}</div>
      <div className="handle" onClick={() => setShow(!show)}></div>
    </div>
  );
};

export default HeaderMainPage;
