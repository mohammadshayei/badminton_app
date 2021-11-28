import React, { useState, useEffect } from "react";
import "./EventsBox.scss";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import BALL_IMAGE from "../../../../assets/images/badminton_ball.png";

const EventsBox = () => {
  const [eventLog, setEventLog] = useState([]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  useEffect(() => {
    let updatedLog = [
      ...eventLog,
      { player2: false, time: "2", type: "score", name: "یازیکن شماره 1" },
      { player2: true, time: "5", type: "score", name: "یازیکن شماره 2" },
      { player2: false, time: "7", type: "score", name: "یازیکن شماره 1" },
      { player2: false, time: "9", type: "score", name: "یازیکن شماره 1" },
    ];
    setEventLog(updatedLog);
  }, []);

  return (
    <div
      className="events-wrapper"
      style={{
        backgroundColor: theme.background_color,
        color: theme.border_color,
      }}
    >
      <div
        className="time-line"
        style={{ backgroundColor: theme.border_color }}
      ></div>
      {eventLog &&
        eventLog.map((item, key) => (
          <div key={key} className={`event ${item.player2 && "opposite"}`}>
            <p className="time">{`' ${item.time}`}</p>
            <div
              className="dot"
              style={{
                backgroundColor: theme.border_color,
                borderColor: theme.background_color,
              }}
            ></div>
            <div className="event-detail">
              <div className="event-icon">
                <img src={item.type === "score" && BALL_IMAGE} alt="" />
              </div>
              <p
                className="player-name"
                style={{
                  color: theme.on_background,
                }}
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventsBox;
