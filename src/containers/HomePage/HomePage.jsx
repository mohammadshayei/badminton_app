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

  const setMenuStatus = (status) => {
    dispatch(detailActions.setMenuStatus(status));
  };
  useEffect(() => {
    if (id) {
      setPage(<TournamentPage id={id} />)
      setSelectedPageIndex(0)
    } else {
      switch (location.pathname) {
        case "/tournaments":
          setPage(<TournamentsPage />)
          setSelectedPageIndex(1)
          break;
        case '/my_games':
          setPage(<GamesPage />)
          setSelectedPageIndex(2)
          break;
        case '/live_scores':
          setPage(<LiveGames />)
          setSelectedPageIndex(3)
          break;
        default:
          navigate('/tournaments')
          setSelectedPageIndex(1)
          break;
      }
    }
  }, [location.pathname, id]);
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
        setShowModal={setShowModal}
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
