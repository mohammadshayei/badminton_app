import React, { useState } from "react";
import "./Page1.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";

const Page1 = (props) => {
  const [selector, setSelector] = useState({ left: "26%" });

  return (
    <div className="page-container">
      <div className="input-line">
        <Input></Input>
        <p>شماره مسابقه</p>
      </div>
      <div className="input-line">
        <Input></Input>
        <p>شماره زمین</p>
      </div>
      <div className="input-line">
        <div className="selector" style={selector}></div>
        <img
          src={rocket}
          alt="rocket"
          onClick={() => setSelector({ left: "26%" })}
        />
        <img
          src={rockets}
          alt="rocket"
          onClick={() => setSelector({ left: "47%" })}
        />
        <p>نوع بازی</p>
      </div>
      <Button onClick={() => props.pageSelector(1)}>بعدی</Button>
      <Button>قبلی</Button>
    </div>
  );
};

export default Page1;
