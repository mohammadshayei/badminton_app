import React, { useState } from "react";
import "./Modal.scss";
import Backdrop from "../Backdrop/Backdrop";
import { animated, useTransition } from "react-spring";
import { createPortal } from "react-dom";
import { useTheme } from "../../../styles/ThemeProvider";

const Modal = React.memo((props) => {
  const [myClassName, setMyClassName] = useState("modal");
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const transitions = useTransition(props.show, {
    from: {
      opacity: 0,
      transform: "translate(-50%,-52%)",
      pointerEvents: "none",
    },
    enter: {
      opacity: 1,
      transform: "translate(-50%,-50%)",
      pointerEvents: "auto",
    },
    leave: {
      opacity: 0,
      transform: "translate(-50%,-48%)",
      pointerEvents: "none",
    },
    config: { friction: 20 },
  });

  return createPortal(
    transitions(
      (styles, item) =>
        item && (
          <>
            <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
            <animated.div
              className={`${myClassName}`}
              style={{
                opacity: styles.opacity,
                transform: styles.transform,
                pointerEvents: styles.pointerEvents,
                color: theme.on_background,
                backgroundColor: theme.background_color,
                ...props.style,
              }}
            >
              {props.children}
            </animated.div>
          </>
        )
    ),
    document.getElementById("portal")
  );
});
export default Modal;
