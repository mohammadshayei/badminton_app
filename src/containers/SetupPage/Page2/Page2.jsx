import React from "react";
import "./Page2.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { animated, useTransition } from "react-spring";

const Page2 = (props) => {
  const transition = useTransition(true, {
    from: { opacity: 0, transform: "translateX(-10%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(10%)" },
  });
  return transition((tranStyles, item) => (
    <animated.div className="page-container" style={tranStyles}>
      <div className="players">
        {[1, 2, 3, 4].map(() => (
          <div className="player-info">
            <p className="player-name">بازیکن</p>
            <div className="player-pic"></div>
            <Input></Input>
          </div>
        ))}
      </div>
      <Button ButtonStyle={{ padding: ".75em 3em" }}>شروع بازی</Button>
      <Button onClick={() => props.pageSelector(0)}>قبلی</Button>
    </animated.div>
  ));
};

export default Page2;
