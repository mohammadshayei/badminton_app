import React from "react";
import "./Page2.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

const Page2 = (props) => {
  return (
    <div className="page-container">
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
    </div>
  );
};

export default Page2;
