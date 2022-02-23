import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "./AppBar/AppBar";
import TournamentPage from "./TournamentPage/TournamentPage";
import Modal from "../../components/UI/Modal/Modal";
import * as detailActions from "../../store/actions/detail";
import { useDispatch } from "react-redux";
import Menu from '../Menu/Menu';
import CreateTournament from "./CreateTournament/CreateTournament";
import { useLocation, useNavigate } from "react-router-dom";
import GamesPage from "./GamesPage/GamesPage";
import LiveGames from "../LiveGames/LiveGames";



const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [page, setPage] = useState(null);

  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();
  const locaiton = useLocation();
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(locaiton.search);
  const pageNumber = searchParams.get("page");

  const setMenuStatus = (status) => {
    dispatch(detailActions.setMenuStatus(status));
  };
  useEffect(() => {
    if (pageNumber) {
      switch (pageNumber) {
        case '1':
          setPage(
            <TournamentPage
              setShowModal={setShowModal}
              setEditMode={setEditMode}
            />)
          break;
        case '2':
          setPage(
            <GamesPage />)
          break;
        case '3':
          setPage(
            <LiveGames
            />)
          break;

        default:
          navigate('/home?page=1')
          break;
      }
    } else {
      navigate('/home?page=1')
    }
  }, [pageNumber]);

  return (
    <div
      className="home-page-wrapper"
      style={{
        background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <div className="version">v1.2.18</div>
      <div className="menu-icon" onClick={() => setMenuStatus(true)}>
        <i
          style={{ color: theme.on_primary }}
          className="fas fa-bars"
        />
      </div>
      <Menu
        setPage={setPage}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        pageId={pageNumber}
      />
      {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <CreateTournament editMode={editMode} modalClosed={() => setShowModal(false)} />
      </Modal>}
      {page}
      <AppBar
        setPage={setPage}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
        pageId={pageNumber}

      />

    </div>
  );
};

export default HomePage;
