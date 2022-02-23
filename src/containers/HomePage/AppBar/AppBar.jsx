import { useState, useEffect } from "react";
import "./AppBar.scss";
import umpire from "../../../assets/images/umpire.png";
import tournament from "../../../assets/images/tournament.png";
import { MdAdd } from "react-icons/md";
import { useTheme } from "../../../styles/ThemeProvider";
import { CgMediaLive } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AppBar = (props) => {
  const [pageId, setPageId] = useState(1);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const navigate = useNavigate()

  const onMenuClickHandler = pageNumber => {
    navigate(`/home?page=${pageNumber}`)
  }
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
      <div className={`page-selector ${props.pageId === '1' && "selected"}`} onClick={() => onMenuClickHandler(1)}>
        <img
          src={tournament}
          alt=""
          style={{
            filter: props.pageId === '1' ? "grayscale(0%)" : "grayscale(100%)",
            opacity: props.pageId === '1' ? "1" : "0.5",
          }}
        />
      </div>
      <div className={`page-selector ${props.pageId === '2' && "selected"}`} onClick={() => onMenuClickHandler(2)}>
        <img
          src={umpire}
          alt=""
          style={{
            filter: props.pageId === '2' ? "grayscale(0%)" : "grayscale(100%)",
            opacity: props.pageId === '2' ? "1" : "0.5",
          }}
        />
      </div>
      <div className={`page-selector ${props.pageId === '3' && "selected"}`} onClick={() => onMenuClickHandler(3)}>
        <CgMediaLive size="1rem" style={{
          color: "black",
          filter: props.pageId === '3' ? "grayscale(0%)" : "grayscale(100%)",
          opacity: props.pageId === '3' ? "1" : "0.5",
        }} />
      </div>
    </div>
  );
};

export default AppBar;
