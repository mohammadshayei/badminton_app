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
    minWidth: "25%"
  }

  const tableRef = useRef();
  const myRef = useRef();

  useEffect(() => {
    setLog([]);
    let newLog = [];
    info.team1.players.forEach((player, index) => {
      newLog = [...newLog, {
        content: <div className="name-in-cell"><div className="player-name-div">{player.name}</div>
        </div>
      }]
    });
    info.team2.players.forEach((player, index) => {
      newLog = [...newLog, {
        content: <div className="name-in-cell"><div className="player-name-div">{player.name}</div>
        </div>
      }]
    });

    if (info.team1.players.length === 2) {
      setLog([[...newLog],
      [{ content: `${info.team1.server === 1 ? "S" : (info.team1.receiver === 1) ? "R" : ''}` },
      { content: `${info.team1.server === 2 ? "S" : (info.team1.receiver === 2) ? "R" : ''}` },
      { content: `${info.team2.server === 1 ? "S" : (info.team2.receiver === 1) ? "R" : ''}` },
      { content: `${info.team2.server === 2 ? "S" : (info.team2.receiver === 2) ? "R" : ''}` }],
      [{ content: `${(info.team1.server === 1 || info.team1.receiver === 1) ? "0" : ''}` },
      { content: `${(info.team1.server === 2 || info.team1.receiver === 2) ? "0" : ''}` },
      { content: `${(info.team2.server === 1 || info.team2.receiver === 1) ? "0" : ''}` },
      { content: `${(info.team2.server === 2 || info.team2.receiver === 2) ? "0" : ''}` }]])
    }
    else {
      setLog([[...newLog],
      [{ content: `${info.team1.server === 1 ? "S" : (info.team1.receiver === 1) ? "R" : ''}` },
      { content: `${info.team2.server === 1 ? "S" : (info.team2.receiver === 1) ? "R" : ''}` }],
      [{ content: `${(info.team1.server === 1 || info.team1.receiver === 1) ? "0" : ''}` },
      { content: `${(info.team2.server === 1 || info.team2.receiver === 1) ? "0" : ''}` },
      ]])
    }
  }, [info.team1.setWon, info.team2.setWon])

  useEffect(() => {

    if (!info.undoMode) {
      if (info.events.length === 0)
        return
      let newColumn = true;
      if (info.events[info.events.length - 1].by === "none") {    // if yeki az oon se ta bood
        let newLog = [...log];
        if (newLog.length > 0)    //if chizi log shode bood
        {
          for (let i = 0; i < newLog[newLog.length - 1].length; i++) {    // loop ro akharin soton table
            if (newLog[newLog.length - 1][i].content.length > 0) {        //if chizi too cell bood
              if (i === 0 || i === 2)
                newLog[newLog.length - 1][i + 1].content =
                  info.events[info.events.length - 1].content;
              else if (i === 1 || i === 3)
                newLog[newLog.length - 1][i - 1].content =
                  info.events[info.events.length - 1].content;
              setLog(newLog);
              newColumn = false;
              break;
            }
          };
        }
      }

      if (newColumn) {
        info.team1.players.forEach((player, index) => {
          if (info.events[info.events.length - 1].by === player.id)
            setLog([...log, [
              { content: `${index === 0 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${index === 1 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${index === 2 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${index === 3 ? info.events[info.events.length - 1].content : ''}` },
            ]])
        })
        let newIndex;
        info.team2.players.forEach((player, index) => {
          if (info.team2.players.length === 2)
            newIndex = index + 2;
          else
            newIndex = index + 1;
          if (info.events[info.events.length - 1].by === player.id)
            setLog([...log, [
              { content: `${newIndex === 0 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${newIndex === 1 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${newIndex === 2 ? info.events[info.events.length - 1].content : ''}` },
              { content: `${newIndex === 3 ? info.events[info.events.length - 1].content : ''}` },
            ]])
        })
        myRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      }
    }
    else {
      if (log.length === 0) return
      let updatedLog = [...log]
      if (updatedLog[updatedLog.length - 1].find(item => item.content === 'F'))
        updatedLog.splice(updatedLog.length - 1, 1)
      else if (updatedLog[updatedLog.length - 1].find(item => item.content === 'O' || item.content === 'C')) {
        let newLog = updatedLog[updatedLog.length - 1];
        newLog = newLog.map(item => {
          if (item.content === 'O' || item.content === 'C') return { content: "" }
          else return { content: item.content }
        })
        updatedLog[updatedLog.length - 1] = newLog
      }
      else if (updatedLog[updatedLog.length - 1].find(item => (item.content === 'R'))) {
        if (updatedLog[updatedLog.length - 1].find(item => (item.content !== '' && item.content !== 'R'))) {
          let newLog = updatedLog[updatedLog.length - 1];
          newLog = newLog.map(item => {
            if (item.content === 'R') return { content: "" }
            else return { content: item.content }
          })
          updatedLog[updatedLog.length - 1] = newLog
        } else {
          updatedLog.splice(updatedLog.length - 1, 1)
        }
      }
      else {
        updatedLog.splice(updatedLog.length - 1, 1)
      }
      setLog(updatedLog)
    }

  }, [info.eventCounter])

  return (
    <div className="events-wrapper">
      <div className="history-table">
        {[...Array(70)].map((e, ci) =>
          <div key={ci} className="table-column"
            style={ci === 0 ? columnStyle : {}}
            ref={ci === info.eventCounter ? myRef : tableRef}
          >
            {info.team1.players.length > 0 &&
              ([...Array(4)].map((e, ri) =>
                <div key={ri} className="table-cell"
                  style={{
                    borderBottom: (ri === 1) && "5px solid rgb(146, 146, 146)",
                    height: '25%',
                    padding: ci === 0 && "0 0.5rem",
                    background: ri > 1 && "rgba(200, 200, 200, 0.2)"
                  }}
                >
                  {(log[ci]) && (info.team1.players.length === 2 ?
                    log[ci][ri].content :
                    (ri % 2 === 0 ? (ri === 0 ?
                      log[ci][0].content :
                      log[ci][1].content) :
                      ""))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default EventsBox;
