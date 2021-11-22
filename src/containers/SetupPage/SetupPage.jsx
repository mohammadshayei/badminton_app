import React, { useState, useEffect } from "react";
import { useTheme } from "../../styles/ThemeProvider";
import Page1 from "./Page1/Page1";
import Page2 from "./Page2/Page2";
import "./SetupPage.scss";
import { IoLanguageOutline } from "react-icons/io5";
import { animated, useSprings } from "react-spring";
import { useGesture } from "@use-gesture/react";

const SetupPage = () => {
  const [page, setPage] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([
    { selected: true },
    { selected: false },
  ]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const springs = useSprings(
    2,
    pageNumbers.map((item) => ({
      transform: item.selected ? "scale(1.5)" : "scale(1)",
      opacity: item.selected ? 1 : 0.8,
      config: { mass: 0.5, tension: 500, friction: 20 },
    }))
  );

  const selector = (key) => {
    let updatedPageNumbers = [...pageNumbers];
    updatedPageNumbers.forEach((page) => {
      page.selected = false;
    });
    updatedPageNumbers[key].selected = true;
    setPageNumbers(updatedPageNumbers);
  };

  const bind = useGesture({
    onDragEnd: ({ direction: [directionX] }) => {
      if (directionX === 1) {
        selector(1);
      }
      if (directionX === -1) {
        selector(0);
      }
    },
  });

  useEffect(() => {
    if (pageNumbers[0].selected) setPage(<Page1 pageSelector={selector} />);
    if (pageNumbers[1].selected) setPage(<Page2 pageSelector={selector} />);
  }, [pageNumbers]);

  return (
    <div
      className="setup-container"
      style={{
        background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <IoLanguageOutline className="change-lan-icon" />
      <div className="navigation-component">
        {springs.map((styles) => (
          <animated.div
            key={styles.opacity.id}
            className="page-indicator"
            style={styles}
          ></animated.div>
        ))}
      </div>
      <div
        {...bind()}
        className="body-container"
        style={{ touchAction: "none" }}
      >
        {page}
      </div>
    </div>
  );
};

export default SetupPage;
