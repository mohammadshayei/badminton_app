import React, { useState, useEffect, useRef } from "react";
import "./EventsBox.scss";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import { useSelector } from "react-redux";

const EventsBox = () => {
  const [log, setLog] = useState([])
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const info = useSelector((state) => state.info);

  const columnStyle = {
    position: "fixed",
    left: 0,
    bottom: 0,
    height: "20vh",
    maxWidth: "25%",
    minWidth: "25%",
    borderRight: "none"
  }

  const tableRef = useRef();
  const myRef = useRef();

  useEffect(() => {
    setLog([]);
    console.log(log);
    let newLog = [];
    info.team1.players.forEach((player, index) => {
      newLog = [...newLog, {
        content: <div className="name-in-cell"><div className="player-name-div">{player.name}</div>
          <div>{info.team1.server === index + 1 ? "S" : ''}
            {info.team1.receiver === index + 1 ? "R" : ''}</div></div>
      }]
    });
    info.team2.players.forEach((player, index) => {
      newLog = [...newLog, {
        content: <div className="name-in-cell"><div className="player-name-div">{player.name}</div>
          <div>{info.team2.server === index + 1 ? "S" : ''}
            {info.team2.receiver === index + 1 ? "R" : ''}</div></div>
      }]
    });
    setLog([[...newLog],
    [{ content: `${(info.team1.server === 1 || info.team1.receiver === 1) ? "0" : ''}` },
    { content: `${(info.team1.server === 2 || info.team1.receiver === 2) ? "0" : ''}` },
    { content: `${(info.team2.server === 1 || info.team2.receiver === 1) ? "0" : ''}` },
    { content: `${(info.team2.server === 2 || info.team2.receiver === 2) ? "0" : ''}` }]])
  }, [info.team1.setWon, info.team2.setWon])

  useEffect(() => {
    if (info.events.length > 0) {
      info.team1.players.forEach((player, index) => {
        if (info.events[info.events.length - 1].by === player.name)
          setLog([...log, [
            { content: `${index === 0 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index === 1 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index === 2 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index === 3 ? info.events[info.events.length - 1].content : ''}` },
          ]])
      })
      info.team2.players.forEach((player, index) => {
        if (info.events[info.events.length - 1].by === player.name)
          setLog([...log, [
            { content: `${index + 2 === 0 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index + 2 === 1 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index + 2 === 2 ? info.events[info.events.length - 1].content : ''}` },
            { content: `${index + 2 === 3 ? info.events[info.events.length - 1].content : ''}` },
          ]])
      })
      myRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }, [info.events])

  return (
    <div className="events-wrapper">
      <div className="history-table">
        {[...Array(70)].map((e, ci) =>
          <div key={ci} className="table-column"
            style={ci === 0 ? columnStyle : {}}
            ref={ci === info.events.length ? myRef : tableRef}
          >
            {[...Array(4)].map((e, ri) =>
              <div key={ri * 5} className="table-cell"
                style={{
                  borderBottom: ri === 1 && "5px solid rgb(146, 146, 146)",
                  padding: ci === 0 && "0 0.5rem"
                }}
              >
                {(log[ci]) && log[ci][ri].content}
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  );
};

export default EventsBox;
