import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";

const OneTable = ({
    isSingle, events, playerTeamA, playerTeamB,
    isOne, teamADetail, teamBDetail, empty, isInPrev }) => {
    // console.log(events)
    const [log, setLog] = useState([])
    const columnStyle = {
        height: "20mm",
        // maxWidth: "45mm",
        // minWidth: "45mm",
        borderRight: "3px solid rgb(60, 60, 60)",
        borderLeft: "3px solid rgb(60, 60, 60)",
        width: "55mm",
    }

    useEffect(() => {
        if (!events) return;
        let newLog = [];
        // initialize name
        newLog = [...newLog, {
            content: <div className="name-in-cell-r"><div className="player-name-div-r">{playerTeamA[0].player.username}</div>
            </div>
        }, {
            content: !isSingle ? <div className="name-in-cell-r"><div className="player-name-div-r">{playerTeamA[1].player.username}</div>
            </div> : ""
        }, {
            content: <div className="name-in-cell-r"><div className="player-name-div-r">{playerTeamB[0].player.username}</div>
            </div>
        }, {
            content: !isSingle ? <div className="name-in-cell-r"><div className="player-name-div-r">{playerTeamB[1].player.username}</div>
            </div> : ""
        }]
        // correct the log format
        newLog = [[...newLog]]
        if (empty) {
            setLog(newLog);
            return;
        }
        if (isOne) {
            newLog = [...newLog,
            [{ content: `${teamADetail.server === 1 ? "S" : (teamADetail.receiver === 1 && !isSingle) ? "R" : ''}` },
            { content: `${teamADetail.server === 2 ? "S" : (teamADetail.receiver === 2 && !isSingle) ? "R" : ''}` },
            { content: `${teamBDetail.server === 1 ? "S" : (teamBDetail.receiver === 1 && !isSingle) ? "R" : ''}` },
            { content: `${teamBDetail.server === 2 ? "S" : (teamBDetail.receiver === 2 && !isSingle) ? "R" : ''}` }],
            [{ content: `${(teamADetail.server === 1 || teamADetail.receiver === 1) ? "0" : ''}` },
            { content: `${(teamADetail.server === 2 || teamADetail.receiver === 2) ? "0" : ''}` },
            { content: `${(teamBDetail.server === 1 || teamBDetail.receiver === 1) ? "0" : ''}` },
            { content: `${(teamBDetail.server === 2 || teamBDetail.receiver === 2) ? "0" : ''}` }]]
        } else {
            newLog = [...newLog,
            [{ content: '' },
            { content: '' },
            { content: '' },
            { content: '' }]]
        }

        let checkTwoPoint = false, twoPoint = false;
        events.forEach((event, i) => {
            // if (event.type !== 'increaseBall' && event.type !== 'decreaseBall') {
            let newColumn = true;
            if (events[events.length - 1].by === "none") {    // if yeki az oon se ta bood
                let newLog = [...log];
                if (newLog.length > 0)    //if chizi log shode bood
                {
                    for (let i = 0; i < newLog[newLog.length - 1].length; i++) {    // loop ro akharin soton table
                        if (newLog[newLog.length - 1][i].content.length > 0) {        //if chizi too cell bood
                            if (i === 0 || i === 2)
                                newLog[newLog.length - 1][i + 1].content =
                                    events[events.length - 1].content;
                            else if (i === 1 || i === 3)
                                newLog[newLog.length - 1][i - 1].content =
                                    events[events.length - 1].content;
                            setLog(newLog);
                            newColumn = false;
                            break;
                        }
                    };
                }
            }

            if (newColumn) {
                playerTeamA.forEach((player, index) => {
                    if (event.by === player.player._id) {
                        newLog = [...newLog, [
                            { content: `${index === 0 ? event.content : ''}` },
                            { content: `${index === 1 ? event.content : ''}` },
                            { content: `${index === 2 ? event.content : ''}` },
                            { content: `${index === 3 ? event.content : ''}` },
                        ]]
                        if (isInPrev === 1) {
                            if (event.content === "20")
                                newLog = [...newLog, [
                                    { content: '' },
                                    { content: '' },
                                    { content: '' },
                                    { content: '' },]];
                        }
                        else {
                            if (event.content === "20")
                                checkTwoPoint = true;
                        }
                    }
                })
                let newIndex;
                playerTeamB.forEach((player, index) => {
                    newIndex = index + 2;
                    if (event.by === player.player._id) {
                        newLog = [...newLog, [
                            { content: `${newIndex === 0 ? event.content : ''}` },
                            { content: `${newIndex === 1 ? event.content : ''}` },
                            { content: `${newIndex === 2 ? event.content : ''}` },
                            { content: `${newIndex === 3 ? event.content : ''}` },
                        ]]
                        if (isInPrev === 1) {
                            if (event.content === "20")
                                newLog = [...newLog, [
                                    { content: '' },
                                    { content: '' },
                                    { content: '' },
                                    { content: '' },]];
                        }
                        else
                            if (checkTwoPoint && event.content === "20")
                                twoPoint = true;
                    }
                })
                if (checkTwoPoint && twoPoint) {
                    newLog = [...newLog, [
                        { content: '' },
                        { content: '' },
                        { content: '' },
                        { content: '' },]];
                    checkTwoPoint = false;
                }
                if (i === events.length - 1) {
                    newLog = [...newLog, [
                        { content: '' },
                        { content: '' },
                        { content: '' },
                        { content: '' },
                    ], [
                        { content: `${teamADetail.score}` },
                        { content: '' },
                        { content: `${playerTeamB.length === 1 ? teamBDetail.score : ''}` },
                        { content: `${playerTeamB.length > 1 ? teamBDetail.score : ''}` },
                    ]]
                }
            }
        }
        )
        setLog(newLog);
    }, [])
    return (
        <div className="events-wrapper-report">
            <div className="history-table-report" >
                {
                    [...Array(34)].map((e, ci) =>
                        <div key={ci} className="table-column-report"
                            style={ci === 0 ? columnStyle : {
                                borderRight: (ci === 1 || ci === 33) &&
                                    "3px solid rgb(60, 60, 60)",
                            }}
                        >
                            {ci === log.length - 1 && ci !== 0 &&
                                <div className={`circle ${playerTeamA.length === 1 && "smaller-circle"}`}>
                                    <div className="line" />
                                </div>
                            }
                            {
                                log[ci] && (log[ci][0].content === '' && log[ci][1].content === '' && log[ci][2].content === '' && log[ci][3].content === '') &&
                                (log[ci - 1][0].content === '20' || log[ci - 1][1].content === '20' || log[ci - 1][2].content === '20' || log[ci - 1][3].content === '20') &&
                                <div className="rotated-line" />
                            }
                            {
                                ([...Array(4)].map((e, ri) =>
                                    <div key={ri} className="table-cell-report"
                                        style={{
                                            borderTop: (ri === 0) && "3px solid rgb(60, 60, 60)",
                                            borderBottom: (ri === 1 || ri === 3) && "3px solid rgb(60, 60, 60)",
                                            height: '25%',
                                            padding: ci === 0 && "0 0.2rem",
                                            background: ri > 1 && "rgba(190, 190, 190, 0.5)",
                                            fontSize: ci === 0 && "11px",
                                            justifyContent: ci === 0 && "flex-start"
                                        }}
                                    >
                                        {(log[ci]) && log[ci][ri].content}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default OneTable
