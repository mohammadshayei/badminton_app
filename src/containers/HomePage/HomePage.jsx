import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import TournamentPage from "./TournamentPage/TournamentPage";
import Modal from "../../components/UI/Modal/Modal";
import * as detailActions from "../../store/actions/detail";
import { useDispatch, useSelector } from "react-redux";
import Menu from '../Menu/Menu';
import CreateTournament from "./CreateTournament/CreateTournament";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GamesPage from "./GamesPage/GamesPage";
import LiveGames from "../LiveGames/LiveGames";
import TournamentsPage from "./TournamentsPage/TournamentsPage";
import SearchBox from "./SearchBox/SearchBox";
import TournamentForm from "./InputForms/TournamentForm/TournamentForm";
import TeamsPage from "./TeamsPage/TeamsPage";
import TeamPage from "./TeamPage/TeamPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import PurchaseCallBack from "../PurchaseCallBack/PurchaseCallBack";
import TeamForm from "./InputForms/TeamForm/TeamForm";
import EditTeamForm from "./InputForms/EditTeamForm/EditTeamForm";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [page, setPage] = useState(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);


  const themeState = useTheme();
  const theme = themeState.computedTheme;
  let { id } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const showMenu = useSelector(state => state.detail.showMenu);
  const { token } = useSelector(state => state.auth);


  const setMenuStatus = (status) => {
    dispatch(detailActions.setMenuStatus(status));
  };
  useEffect(() => {
    if (id) {
      if (location.pathname.includes('/tournaments'))
        setPage(<TournamentPage id={id} />)
      else if (location.pathname.includes('/teams'))
        setPage(<TeamPage id={id} />)
      setSelectedPageIndex(0)
    } else {
      switch (location.pathname) {
        case "/tournaments":
          setPage(<TournamentsPage />)
          setSelectedPageIndex(1)
          break;
        case '/teams':
          setPage(<TeamsPage />)
          setSelectedPageIndex(2)
          break;
        case '/my_games':
          // if (!token) {
          //   navigate('/tournaments')
          //   break;
          // }
          setPage(<GamesPage />)
          setSelectedPageIndex(3)
          break;
        case '/live_scores':
          setPage(<LiveGames />)
          setSelectedPageIndex(4)
          break;
        case '/new_tournament':
          if (!token) {
            navigate('/tournaments')
            break;
          }
          setPage(<TournamentForm />)
          setSelectedPageIndex(5)
          break;
        case '/edit_tournament':
          if (!token) {
            navigate('/tournaments')
            break;
          }
          setPage(<TournamentForm />)
          setSelectedPageIndex(0)
          break;
        case '/edit_team':
          if (!token) {
            navigate('/teams')
            break;
          }
          setPage(<EditTeamForm />)
          setSelectedPageIndex(0)
          break;
        case '/profile':
          if (!token) {
            navigate('/tournaments')
            break;
          }
          setPage(<ProfilePage />)
          setSelectedPageIndex(6)
          break;
        case '/pay':
          if (!token) {
            navigate('/tournaments')
            break;
          }
          setPage(<PurchaseCallBack />)
          setSelectedPageIndex(7)
          break;
        default:
          navigate('/tournaments')
          setSelectedPageIndex(1)
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, id, token]);
  return (
    <div
      className={`home-page-wrapper ${showMenu ? "menu-open" : ""}`}
      style={{
        background: theme.background_color,
        color: theme.on_background,
      }}
    >
      <SearchBox />
      <div className="menu-icon" onClick={() => setMenuStatus(true)}>
        <i
          style={{ color: theme.on_primary }}
          className="fas fa-bars"
        />
      </div>
      <Menu
        setEditMode={setEditMode}
        selectedPageIndex={selectedPageIndex}
      />
      {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <CreateTournament editMode={editMode} modalClosed={() => setShowModal(false)} />
      </Modal>}
      {page}
    </div>
  );
};

export default HomePage;
