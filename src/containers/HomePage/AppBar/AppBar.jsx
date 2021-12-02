import React from "react";
import "./AppBar.scss";
import umpire from "../../../assets/images/umpire.png";
import tournament from "../../../assets/images/tournament.png";
import { MdAdd } from "react-icons/md";
import { useTheme } from "../../../styles/ThemeProvider";

const AppBar = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className="app-bar">
      <div className="page-selector">
        <img src={tournament} alt="" />
      </div>
      <div
        className="add-tournament"
        style={{
          background: theme.background_color,
          color: theme.primary,
        }}
      >
        <MdAdd />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50">
        <path
          d="M-301,746.871l1.521,0c37.128-.459,145.841-.453,168.479,0-53.945.374-44.583,46.128-85,45.16C-254.058,792.86-253.5,747.8-301,746.871Z"
          transform="translate(301 -746.533)"
          fill={theme.primary_variant}
        />
      </svg>
      <div className="page-selector">
        <img src={umpire} alt="" />
      </div>
    </div>
  );
};

export default AppBar;
