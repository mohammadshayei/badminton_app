import React, { useState, useEffect } from "react";
import { useTheme } from "../../styles/ThemeProvider";
import Page1 from "./Page1/Page1";
import Page2 from "./Page2/Page2";
import "./SetupPage.scss";

const SetupPage = () => {
  const [body, setBody] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([
    { selected: true },
    { selected: false },
  ]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const selectedStyle = {
    background: "white",
    color: theme.primary,
    cursor: "unset",
  };

  const selector = (key) => {
    let updatedPageNumbers = [...pageNumbers];
    updatedPageNumbers.forEach((page) => {
      page.selected = false;
    });
    updatedPageNumbers[key].selected = true;
    setPageNumbers(updatedPageNumbers);
  };

  useEffect(() => {
    for (let index = 0; index < pageNumbers.length; index++) {
      if (pageNumbers[index].selected) {
        switch (index + 1) {
          case 1:
            setBody(<Page1 pageSelector={selector} />);
            break;
          case 2:
            setBody(<Page2 pageSelector={selector} />);
            break;

          default:
            setBody(<Page1 pageSelector={selector} />);
            break;
        }
      }
    }
  }, [pageNumbers]);

  return (
    <div
      className="setup-container"
      style={{
        background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <div className="navigation-component">
        <div
          className="page-number"
          style={pageNumbers[0].selected ? selectedStyle : null}
          onClick={() => selector(0)}
        >
          1
        </div>
        <div className="line"></div>
        <div
          className="page-number"
          style={pageNumbers[1].selected ? selectedStyle : null}
          onClick={() => selector(1)}
        >
          2
        </div>
      </div>
      {body}
    </div>
  );
};

export default SetupPage;
