import { useState, useEffect } from "react";
import "./AppBar.scss";
import umpire from "../../../assets/images/umpire.png";
import tournament from "../../../assets/images/tournament.png";
import { MdAdd } from "react-icons/md";
import { useTheme } from "../../../styles/ThemeProvider";
import TournamentPage from "../TournamentPage/TournamentPage";
import GamesPage from "../GamesPage/GamesPage";
import LiveGames from "../../LiveGames/LiveGames";
import { CgMediaLive } from "react-icons/cg";

const AppBar = (props) => {
  const [pageId, setPageId] = useState(1);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    switch (pageId) {
      case 1:
        props.setPage(
          <TournamentPage
            setShowModal={props.setShowModal}
            setEditMode={props.setEditMode}
          />);
        break;
      case 2:
        props.setPage(<GamesPage />);
        break;
      case 3:
        props.setPage(<LiveGames />);
        break;
      default:
        props.setPage(
          <TournamentPage
            setShowModal={props.setShowModal}
            setEditMode={props.setEditMode}
          />);
        break;
    }
  }, [pageId]);

  return (
    <div className="app-bar">
      <div
        className="add-tournament"
        style={{
          background: theme.background_color,
          color: theme.primary,
        }}
        onClick={() => {
          props.setShowModal(true)
          props.setEditMode(false)
        }}
      >
        <MdAdd />
      </div>
      <div className={`page-selector ${pageId === 1 && "selected"}`} onClick={() => setPageId(1)}>
        <img
          src={tournament}
          alt=""
          style={{
            filter: pageId === 1 ? "grayscale(0%)" : "grayscale(100%)",
            opacity: pageId === 1 ? "1" : "0.5",
          }}
        />
      </div>
      <div className={`page-selector ${pageId === 2 && "selected"}`} onClick={() => setPageId(2)}>
        <img
          src={umpire}
          alt=""
          style={{
            filter: pageId === 2 ? "grayscale(0%)" : "grayscale(100%)",
            opacity: pageId === 2 ? "1" : "0.5",
          }}
        />
      </div>
      <div className={`page-selector ${pageId === 3 && "selected"}`} onClick={() => setPageId(3)}>
        <CgMediaLive size="1rem" style={{
          color: "black",
          filter: pageId === 3 ? "grayscale(0%)" : "grayscale(100%)",
          opacity: pageId === 3 ? "1" : "0.5",
        }} />
      </div>
    </div>
  );
};

export default AppBar;
