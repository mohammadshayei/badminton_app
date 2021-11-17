import React, { useState } from "react";
import "./Page1.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import { animated, useSpring, useTransition } from "react-spring";

const Page1 = (props) => {
  const [double, setDouble] = useState(false);
  const styles = useSpring({
    from: { left: double ? "0" : "51px" },
    to: { left: double ? "51px" : "0" },
    config: { mass: 0.5, tension: 500, friction: 20 },
  });
  const transition = useTransition(true, {
    from: { opacity: 0, transform: "translateX(10%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-10%)" },
  });

  return transition((tranStyles, item) => (
    <animated.div className="page-container" style={tranStyles}>
      <div className="input-line">
        <Input></Input>
        <p>شماره مسابقه</p>
      </div>
      <div className="input-line">
        <Input></Input>
        <p>شماره زمین</p>
      </div>
      <div className="input-line">
        <div className="width-fixer">
          <animated.div className="selector" style={styles}></animated.div>
          <img src={rocket} alt="rocket" onClick={() => setDouble(false)} />
          <img src={rockets} alt="rocket" onClick={() => setDouble(true)} />
        </div>
        <p>نوع بازی</p>
      </div>
      <Button onClick={() => props.pageSelector(1)}>بعدی</Button>
      <Button>قبلی</Button>
    </animated.div>
  ));
};

export default Page1;
