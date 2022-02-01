import React, { useState } from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "./AppBar/AppBar";
import TournamentPage from "./TournamentPage/TournamentPage";
import Modal from "../../components/UI/Modal/Modal";
import * as detailActions from "../../store/actions/detail";
import { useDispatch } from "react-redux";
import Menu from '../Menu/Menu';
import CreateTournament from "./CreateTournament/CreateTournament";



const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [page, setPage] = useState(
    <TournamentPage
      setShowModal={setShowModal}
      setEditMode={setEditMode}
    />);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const dispatch = useDispatch();

  const setMenuStatus = (status) => {
    dispatch(detailActions.setMenuStatus(status));
  };

  return (
    <div
      className="home-page-wrapper"
      style={{
        background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <div className="version">v1.2.12</div>
      {/* <div className="menu-icon" onClick={() => setMenuStatus(true)}>
        <i
          style={{ color: theme.on_primary }}
          className="fas fa-bars"
        />
      </div> */}
      <Menu
        setPage={setPage}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
      />
      {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <CreateTournament editMode={editMode} modalClosed={() => setShowModal(false)} />
      </Modal>}
      {page}
      <AppBar
        setPage={setPage}
        setShowModal={setShowModal}
        setEditMode={setEditMode}
      />

    </div>
  );
};

export default HomePage;
