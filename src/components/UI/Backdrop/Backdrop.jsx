import React from "react";
import "./Backdrop.scss";
import { animated, useSpring } from "react-spring";

const Backdrop = (props) => {
  const spring = useSpring({
    opacity: props.show ? 1 : 0,
    pointerEvents: props.show ? "auto" : "none",
    from: { opacity: 0, pointerEvents: "none" },
  });

  return (
    <animated.div
      className="backdrop"
      onClick={props.clicked}
      style={spring}
    ></animated.div>
  );
};

export default Backdrop;
