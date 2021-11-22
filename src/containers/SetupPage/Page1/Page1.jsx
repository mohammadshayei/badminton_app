import React, { useRef, useState } from "react";
import "./Page1.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import { animated, useSpring, useTransition } from "react-spring";
import { useTheme } from "../../../styles/ThemeProvider";
import { GrFormPrevious } from "react-icons/gr";
import { HiCamera } from "react-icons/hi";

const Page1 = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [double, setDouble] = useState(false);
  const styles = useSpring({
    from: { left: double ? "0" : "51px" },
    to: { left: double ? "51px" : "0" },
    config: { mass: 0.5, tension: 500, friction: 20 },
  });
  const transition = useTransition(true, {
    from: { transform: "translateX(20%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(-20%)" },
  });
  // transition((tranStyles, item) => style={tranStyles}

  return transition((tranStyles, item) => (
    <animated.div className="page-container page-1" style={tranStyles}>
      <div className="input-line">
        <img className="camera" src="https://i.pravatar.cc/126" alt="avatar" />
        <div className="avatar">
          <div className="avatar-upload-btn">
            <HiCamera />
          </div>
        </div>
        <Input></Input>
        <p> داور بازی</p>
      </div>
      <div className="input-line">
        <img className="camera" src="https://i.pravatar.cc/127" alt="avtar" />
        <div className="avatar">
          <div className="avatar-upload-btn">
            <HiCamera />
          </div>
        </div>
        <Input></Input>
        <p> داور سرویس</p>
      </div>
      <div className="input-line">
        <Input></Input>
        <p>شماره مسابقه</p>
      </div>
      <div className="input-line">
        <Input></Input>
        <p>شماره زمین</p>
      </div>
      <div className="input-line full-row">
        <div className="width-fixer">
          <animated.div
            className="selector"
            style={{
              ...styles,
              background: theme.primary,
            }}
          ></animated.div>
          <img src={rocket} alt="rocket" onClick={() => setDouble(false)} />
          <img src={rockets} alt="rocket" onClick={() => setDouble(true)} />
        </div>
        <p>نوع بازی</p>
      </div>
      <Button
        className="next-btn"
        onClick={() => {
          props.pageSelector(1);
        }}
      >
        بعدی
      </Button>
    </animated.div>
  ));
};

export default Page1;
