import React, { useState, useEffect, useRef } from "react";
import "./EventsBox.scss";
import { useTheme } from "../../../../styles/ThemeProvider.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo";

const EventsBox = (props) => {
  const [log, setLog] = useState([]);
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const info = useSelector((state) => state.info);

  const columnStyle = {
    display: props.show ? "block" : "none",
    position: "fixed",
    left: 0,
    bottom: 0,
    height: props.show === "normal" ? "20vh" : "50vh",
    maxWidth: props.show === "normal" ? "25%" : "35%",
    minWidth: props.show === "normal" ? "25%" : "35%",
  };

  const tableRef = useRef();
  const myRef = useRef();
  const dispatch = useDispatch();
  const setMidStageStatus = (status) => {
    dispatch(infoActions.setMidStageStatus(status));
  };

  const addNewEventOnLog = (event) => {
    let newColumn = true;
    if (event.by === "none") {
      // if yeki az oon se ta bood
      let newLog = [...log];
      if (newLog.length > 0) {
        //if chizi log shode bood
        for (let i = 0; i < newLog[newLog.length - 1].length; i++) {
          // loop ro akharin soton table
          if (newLog[newLog.length - 1][i].content.length > 0) {
            //if chizi too cell bood
            if (i === 0 || i === 2)
              newLog[newLog.length - 1][i + 1].content = event.content;
            else if (i === 1 || i === 3)
              newLog[newLog.length - 1][i - 1].content = event.content;
            setLog(newLog);
            newColumn = false;
            break;
          }
        }
      }
    }

    if (newColumn) {
      info.team1.players.forEach((player, index) => {
        if (event.by === player.id)
          setLog([
            ...log,
            [
              { content: `${index === 0 ? event.content : ""}` },
              { content: `${index === 1 ? event.content : ""}` },
              { content: `${index === 2 ? event.content : ""}` },
              { content: `${index === 3 ? event.content : ""}` },
            ],
          ]);
      });
      let newIndex;
      info.team2.players.forEach((player, index) => {
        newIndex = index + 2;
        if (event.by === player.id)
          setLog([
            ...log,
            [
              { content: `${newIndex === 0 ? event.content : ""}` },
              { content: `${newIndex === 1 ? event.content : ""}` },
              { content: `${newIndex === 2 ? event.content : ""}` },
              { content: `${newIndex === 3 ? event.content : ""}` },
            ],
          ]);
      });
      // myRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  };

  useEffect(() => {
    if (info.midStage && info._id) {
      setLog([]);
      let newLog = [];
      newLog = [
        ...newLog,
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team1.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team1.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team1.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team2.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team2.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team2.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
      ];
      newLog = [
        [...newLog],
        [
          {
            content: `${
              info.initTeam1.server === 1
                ? "S"
                : info.initTeam1.receiver === 1 &&
                  info.team1.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam1.server === 2
                ? "S"
                : info.initTeam1.receiver === 2 &&
                  info.team1.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam2.server === 1
                ? "S"
                : info.initTeam2.receiver === 1 &&
                  info.team2.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam2.server === 2
                ? "S"
                : info.initTeam2.receiver === 2 &&
                  info.team2.players.length === 2
                ? "R"
                : ""
            }`,
          },
        ],
        [
          {
            content: `${
              info.initTeam1.server === 1 || info.initTeam1.receiver === 1
                ? "0"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam1.server === 2 || info.initTeam1.receiver === 2
                ? "0"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam2.server === 1 || info.initTeam2.receiver === 1
                ? "0"
                : ""
            }`,
          },
          {
            content: `${
              info.initTeam2.server === 2 || info.initTeam2.receiver === 2
                ? "0"
                : ""
            }`,
          },
        ],
      ];
      if (info.events.length > 0) {
        info.events.forEach((event) => {
          let newColumn = true;
          if (event.by === "none") {
            // if yeki az oon se ta bood
            if (newLog.length > 0) {
              //if chizi log shode bood
              for (let i = 0; i < newLog[newLog.length - 1].length; i++) {
                // loop ro akharin soton table
                if (newLog[newLog.length - 1][i].content.length > 0) {
                  //if chizi too cell bood
                  if (i === 0 || i === 2)
                    newLog[newLog.length - 1][i + 1].content = event.content;
                  else if (i === 1 || i === 3)
                    newLog[newLog.length - 1][i - 1].content = event.content;
                  setLog(newLog);
                  newColumn = false;
                  break;
                }
              }
            }
          }

          if (newColumn) {
            info.team1.players.forEach((player, index) => {
              if (event.by === player.id)
                newLog = [
                  ...newLog,
                  [
                    { content: `${index === 0 ? event.content : ""}` },
                    { content: `${index === 1 ? event.content : ""}` },
                    { content: `${index === 2 ? event.content : ""}` },
                    { content: `${index === 3 ? event.content : ""}` },
                  ],
                ];
            });
            let newIndex;
            info.team2.players.forEach((player, index) => {
              newIndex = index + 2;
              if (event.by === player.id)
                newLog = [
                  ...newLog,
                  [
                    { content: `${newIndex === 0 ? event.content : ""}` },
                    { content: `${newIndex === 1 ? event.content : ""}` },
                    { content: `${newIndex === 2 ? event.content : ""}` },
                    { content: `${newIndex === 3 ? event.content : ""}` },
                  ],
                ];
            });
            // myRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
          }
        });
      }

      setLog(newLog);
    }
  }, [info.midStage]);

  useEffect(() => {
    if (info.team1.score === 0 && info.team2.score === 0 && info._id) {
      setLog([]);
      let newLog = [];
      newLog = [
        ...newLog,
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team1.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team1.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team1.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team2.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team2.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team2.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
      ];

      setLog([
        [...newLog],
        [
          {
            content: `${
              info.team1.server === 1
                ? "S"
                : info.team1.receiver === 1 && info.team1.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.team1.server === 2
                ? "S"
                : info.team1.receiver === 2 && info.team1.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.team2.server === 1
                ? "S"
                : info.team2.receiver === 1 && info.team2.players.length === 2
                ? "R"
                : ""
            }`,
          },
          {
            content: `${
              info.team2.server === 2
                ? "S"
                : info.team2.receiver === 2 && info.team2.players.length === 2
                ? "R"
                : ""
            }`,
          },
        ],
        [
          {
            content: `${
              info.team1.server === 1 || info.team1.receiver === 1 ? "0" : ""
            }`,
          },
          {
            content: `${
              info.team1.server === 2 || info.team1.receiver === 2 ? "0" : ""
            }`,
          },
          {
            content: `${
              info.team2.server === 1 || info.team2.receiver === 1 ? "0" : ""
            }`,
          },
          {
            content: `${
              info.team2.server === 2 || info.team2.receiver === 2 ? "0" : ""
            }`,
          },
        ],
      ]);
    }
  }, [
    info.team1.server,
    info.team2.server,
    info.team1.receiver,
    info.team2.receiver,
    info.team2.setWon,
    info.team1.setWon,
    info._id,
  ]);
  useEffect(() => {
    if (info.playersSwaped < 0) return;
    let updatedLogs = [...log],
      updatedLog = [
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team1.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team1.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team1.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
        {
          content: (
            <div className="name-in-cell">
              <div className="player-name-div">
                {info.team2.players[0].name}
              </div>
            </div>
          ),
        },
        {
          content:
            info.team2.players.length === 2 ? (
              <div className="name-in-cell">
                <div className="player-name-div">
                  {info.team2.players[1].name}
                </div>
              </div>
            ) : (
              ""
            ),
        },
      ];
    updatedLogs.splice(0, 1, updatedLog);
    setLog(updatedLogs)
  }, [info.playersSwaped]);

  useEffect(() => {
    setMidStageStatus(false);
    if (info.midStage) return;
    if (!info.undoMode) {
      if (info.events.length === 0) return;
      addNewEventOnLog(info.events[info.events.length - 1]);
    } else {
      if (log.length === 0) return;
      let updatedLog = [...log];
      if (
        updatedLog[updatedLog.length - 1].find((item) => item.content === "F")
      )
        updatedLog.splice(updatedLog.length - 1, 1);
      else if (
        updatedLog[updatedLog.length - 1].find(
          (item) => item.content === "O" || item.content === "C"
        )
      ) {
        let newLog = updatedLog[updatedLog.length - 1];
        newLog = newLog.map((item) => {
          if (item.content === "O" || item.content === "C")
            return { content: "" };
          else return { content: item.content };
        });
        updatedLog[updatedLog.length - 1] = newLog;
      } else if (
        updatedLog[updatedLog.length - 1].find((item) => item.content === "R")
      ) {
        if (
          updatedLog[updatedLog.length - 1].find(
            (item) => item.content !== "" && item.content !== "R"
          )
        ) {
          let newLog = updatedLog[updatedLog.length - 1];
          newLog = newLog.map((item) => {
            if (item.content === "R") return { content: "" };
            else return { content: item.content };
          });
          updatedLog[updatedLog.length - 1] = newLog;
        } else {
          updatedLog.splice(updatedLog.length - 1, 1);
        }
      } else {
        updatedLog.splice(updatedLog.length - 1, 1);
      }
      setLog(updatedLog);
    }
  }, [info.eventCounter]);

  return (
    <div
      className="events-wrapper"
      id="events"
      style={{
        display: props.show ? "flex" : "none",
      }}
    >
      <div className="history-table">
        {[...Array(70)].map((e, ci) => (
          <div
            key={ci}
            className="table-column"
            style={ci === 0 ? columnStyle : {}}
            ref={ci === info.eventCounter ? myRef : tableRef}
          >
            {info.team1.players.length > 0 &&
              [...Array(4)].map((e, ri) => (
                <div
                  key={ri}
                  className="table-cell"
                  style={{
                    borderBottom: ri === 1 && "5px solid rgb(60, 60, 60)",
                    height: "25%",
                    padding: ci === 0 && "0 0.5rem",
                    background: ri > 1 && "rgba(190, 190, 190, 1)",
                  }}
                >
                  {log[ci] && log[ci][ri].content}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsBox;
