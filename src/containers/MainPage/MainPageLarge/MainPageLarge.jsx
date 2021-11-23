import React, { useState } from "react";
import HeaderMainLarge from "../../../components/Header/HeaderMain/HeaderMainLarge/HeaderMainLarge";
import { useTheme } from "../../../styles/ThemeProvider";
import FooterLarge from "./FooterLarge/FooterLarge";
import "./MainPageLarge.scss";
import ScoreBoardLarge from "./ScoreBoardLarge/ScoreBoardLarge";

const MainPageLarge = () => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [footerHeight, setFooterHeight] = useState(0)
  return (
    <div
      className="main-large-container"
      style={{ backgroundColor: theme.background_color }}
    >
      <HeaderMainLarge />
      <ScoreBoardLarge setFooterHeight={setFooterHeight} />
      <FooterLarge  footerHeight={footerHeight}/>
    </div>
  );
};

export default MainPageLarge;
