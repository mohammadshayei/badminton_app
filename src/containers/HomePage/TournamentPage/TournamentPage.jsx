import React, { useState, useEffect } from "react";
import "./TournamentPage.scss";
import { useTheme } from "../../../styles/ThemeProvider";

import Modal from "../../../components/UI/Modal/Modal";
import TournamentContentSection from "./TournamentContentSection/TournamentContentSection";
import TournamentsList from "./TournamentsList/TournamentsList";

const TournamentPage = (props) => {
  return (
    <div className="tour-page-container">
      <TournamentContentSection />
      <TournamentsList setEditMode={props.setEditMode} setShowModal={props.setShowModal} />
    </div >
  );
};

export default TournamentPage;
