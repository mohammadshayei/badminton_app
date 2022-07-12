import React from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./Backdrop.scss";
// import { animated, useSpring } from "react-spring";

const Backdrop = (props) => {
  // const spring = useSpring({
  //   opacity: props.show ? 1 : 0,
  //   pointerEvents: props.show ? "auto" : "none",
  //   from: { opacity: 0, pointerEvents: "none" },
  // });
  const themeState = useTheme();
  // const theme = themeState.computedTheme;

  return (
    <div
      className="backdrop"
      onClick={props.clicked}
      // style={spring}
      style={{
        backgroundColor: themeState.isDark ? "rgba(250, 250, 250, 0.4)" : "rgba(0, 0, 0, 0.3)",
        opacity: props.show ? 1 : 0,
        pointerEvents: props.show ? "auto" : "none",
        ...props.style,
      }}
    ></div>
  );
};

export default Backdrop;
