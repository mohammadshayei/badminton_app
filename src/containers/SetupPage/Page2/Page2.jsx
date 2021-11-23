import React, { useState, useEffect } from "react";
import "./Page2.scss";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import { animated, useTransition } from "react-spring";
import { HiCamera } from "react-icons/hi";

const Page2 = (props) => {
  const [players, setPlayers] = useState([1, 2]);
  const transition = useTransition(true, {
    from: { transform: "translateX(-20%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(20%)" },
  });

  useEffect(() => {
    setPlayers([1, 2]);
  }, []);

  return transition((tranStyles, item) => (
    <animated.div className="page-container page-2" style={tranStyles}>
      <div className="players">
        {players.map((i) => (
          <div key={i} className="player-info">
            {players.length === 4 && (
              <div className="team-name">-{i % 2 === 0 && <p>تیم</p>}</div>
            )}
            <p className="player-name">بازیکن</p>
            <div className="player-pic">
              <img src={`https://i.pravatar.cc/12${i}`} alt="" />
              <div className="avatar-upload-btn">
                <HiCamera />
              </div>
            </div>
            <Input></Input>
          </div>
        ))}
      </div>
      <div className="btns">
        <Button ButtonStyle={{ padding: ".75em 3em" }}>شروع بازی</Button>
        <Button onClick={() => props.pageSelector(0)}>قبلی</Button>
      </div>
    </animated.div>
  ));
};

export default Page2;
