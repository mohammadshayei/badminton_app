import React, { useState } from "react";
import "./HomePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "./AppBar/AppBar";
import TournamentPage from "./TournamentPage/TournamentPage";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { MdLanguage, MdDarkMode, MdLogout, MdSettings } from "react-icons/md";
import pic from "../../assets/images/avatars/default-avatar.png"
import Modal from "../../components/UI/Modal/Modal"

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(<TournamentPage />);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const menuButonClickHandler = () => setClicked(!clicked);

  return (
    <div
      className="home-page-wrapper"
      style={{
        background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <div className="menu-icon" onClick={menuButonClickHandler}>
        <i
          style={{ color: theme.on_primary }}
          className="fas fa-bars"
        />
      </div>
      <div className={`sidebar-menu ${clicked && "active"}`}>
        <div className="sidebar-menu-icon" onClick={menuButonClickHandler}>
          <i
            style={{ color: theme.on_primary }}
            className="fas fa-times"
          />
        </div>
        <ul>
          <li>
            <MdLanguage className="list-icon" />
            <span className="menu-item">{stringFa.change_lan}</span>
          </li>
          <li>
            <MdDarkMode className="list-icon" />
            <span className="menu-item">{stringFa.dark_theme}</span>
          </li>
          <li>
            <MdSettings className="list-icon" />
            <span className="menu-item">{stringFa.settings}</span>
          </li>
        </ul>
        <div className="profile-content">
          <div className="profile">
            <div className="profile-details">
              <img src={pic} alt="pic" />
              <div className="name">سید</div>
            </div>
            <div className="log-out"><MdLogout /></div>
          </div>
        </div>
      </div>
      {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>test</Modal>}
      {page}
      <AppBar setPage={setPage} setShowModal={setShowModal} />
    </div>
  );
};

export default HomePage;
