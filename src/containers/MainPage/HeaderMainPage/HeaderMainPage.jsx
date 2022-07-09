import "./HeaderMainPage.scss";
import Events from "../EventsModule/Events"
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/UI/Button/Button"
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useTheme } from "../../../styles/ThemeProvider";
import { exitGame, } from "../../../api/scoreboard";
import { useNavigate } from "react-router-dom";
import * as infoActions from "../../../store/actions/setInfo"
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import shuttle_image from "../../../assets/images/badminton_ball.png";

const HeaderMainPage = () => {
  const token = useSelector(state => state.auth.token)
  const gameId = useSelector(state => state.gameInfo.gameId)
  const socket = useSelector(state => state.auth.socket)
  const info = useSelector((state) => state.info);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const increaseBall = () => {
    dispatch(infoActions.increaseBall());
  };
  const decreaseBall = () => {
    dispatch(infoActions.decreaseBall());
  };

  const eventsStyle = { flexDirection: "row-reverse" }

  const onExit = async () => {
    exitGame({ id: gameId }, token)
    if (socket) {
      socket.emit('send_exit_game', { gameId })

    }
    navigate('/my_games')
  }

  return (
    <div className="header-main-container">
      <div className="events-container">
        <Events
          style={eventsStyle}
          hide={true}
        />
      </div>
      <Button
        onClick={onExit}
        back={theme.error}
        hover={theme.error_variant}
        ButtonStyle={{
          fontSize: 'clamp(1.3rem, 3vw, 3vh)',
          padding: "0 1em",
          marginRight: "3vw",
        }}
      >
        {stringFa.exit}
      </Button>
      <div className="add-shuttle" style={{ opacity: info.foulHappend ? 0 : 1 }}>
        <img src={shuttle_image} className="shuttle-img" alt="shuttle" />
        <div className="ball-counter">
          <p>{info.balls}</p>
        </div>
        <Button
          back={theme.primary}
          hover={theme.primary}
          ButtonStyle={{
            padding: "0 0.5em",
            margin: "0 0.2rem",
            fontSize: 'clamp(1.3rem, 3vw, 5vh)',
          }}
          onClick={() => {
            increaseBall();
          }}
        >
          <HiOutlinePlusSm className="btn-content" color={theme.on_primary} />
        </Button>
        <Button
          disabled={info.balls < 2 && true}
          back={theme.primary}
          hover={theme.primary}
          ButtonStyle={{
            padding: "0 0.5em",
            margin: "0 0.2rem",
            fontSize: 'clamp(1.3rem, 3vw, 5vh)',
          }}
          onClick={() => {
            if (info.balls > 1) {
              decreaseBall();
            }
          }}
        >
          <HiMinus className="btn-content" color={theme.on_primary} />
        </Button>
      </div>
    </div>
  );
};

export default HeaderMainPage;
