import React from "react";
import "./Backdrop.scss";
// import { animated, useSpring } from "react-spring";

const Backdrop = (props) => {
  // const spring = useSpring({
  //   opacity: props.show ? 1 : 0,
  //   pointerEvents: props.show ? "auto" : "none",
  //   from: { opacity: 0, pointerEvents: "none" },
  // });

  return (
    <div
      className="backdrop"
      onClick={props.clicked}
      // style={spring}
      style={{
        opacity: props.show ? 1 : 0,
        pointerEvents: props.show ? "auto" : "none",
      }}
    ></div>
  );
};

export default Backdrop;
