import { useEffect, useState } from 'react'
import OneTable from './OneTable'
import { v4 as uuidv4 } from "uuid";

const SetReport = ({ events, playerTeamB, playerTeamA, teamADetail,
    teamBDetail, calTableCount }) => {
    console.log(events)
    const [updatedEvents, setUpdatedEvents] = useState([])
    const [body, setBody] = useState(null)
    const props = { isSingle: playerTeamA.length === 1, playerTeamB, playerTeamA, teamADetail, teamBDetail }

    useEffect(() => {
        if (!events) return;
        if (events[events.length - 1]) {
            let filteredEvents = [...events.filter(event => event.type !== 'increaseBall' && event.type !== 'decreaseBall')]
            if (events[events.length - 1].content !== 'Dis' && events[events.length - 1].content !== 'Ret') {
                // if (event.type !== 'increaseBall' && event.type !== 'decreaseBall')
                // let lastEvent, lastEventWonTeam, newEvent, teamATakeScore, i = filteredEvents.length - 1, by, score;
                // while (i >= 0) {
                //     if (filteredEvents[i].type === 'score') {
                //         lastEvent = filteredEvents[i];
                //         break;
                //     }
                //     i--;
                // }
                // teamATakeScore = playerTeamA.find(item => item.player._id === lastEvent.by) ? true : false;
                // if (teamADetail.setWon) {
                //     let index = filteredEvents.length - 1;
                //     while (index >= 0) {
                //         if (filteredEvents[index].type === 'score' && playerTeamA.find(item => item.player._id === filteredEvents[index].by)) {
                //             lastEventWonTeam = filteredEvents[index];
                //             break;
                //         }
                //         index--;
                //     }
                //     // score = (parseInt(lastEventWonTeam.content) + 1).toString()
                //     score = (parseInt(lastEventWonTeam.content)).toString()

                // } else {
                //     let index = filteredEvents.length - 1;
                //     while (index >= 0) {
                //         if (filteredEvents[index].type === 'score' && playerTeamB.find(item => item.player._id === filteredEvents[index].by)) {
                //             lastEventWonTeam = filteredEvents[index];
                //             break;
                //         }
                //         index--;
                //     }
                //     // score = (parseInt(lastEventWonTeam.content) + 1).toString()
                //     score = (parseInt(lastEventWonTeam.content)).toString()
                // }
                // if (playerTeamA.length === 1)
                //     by = teamADetail.setWon ? playerTeamA[0].player._id : playerTeamB[0].player._id
                // else {
                //     if (teamADetail.setWon) {
                //         by = teamATakeScore ? lastEventWonTeam.by
                //             : playerTeamA[0].player._id === lastEventWonTeam.by ?
                //                 playerTeamA[1].player._id : playerTeamA[0].player._id
                //     } else {
                //         by = !teamATakeScore ? lastEventWonTeam.by
                //             : playerTeamB[0].player._id === lastEventWonTeam.by ?
                //                 playerTeamB[1].player._id : playerTeamB[0].player._id
                //     }
                // }

                // newEvent = {
                //     _id: uuidv4().replace(/\-/g, ""),
                //     content: score,
                //     time: new Date(),
                //     type: "score",
                //     by,

                // }
                setUpdatedEvents([...filteredEvents])
                // setUpdatedEvents([...filteredEvents, newEvent])
            }
            else {
                setUpdatedEvents([...filteredEvents])
            }
        }
    }, [])

    useEffect(() => {
        if (updatedEvents.length > 0) {
            if (updatedEvents.length > 31) {
                calTableCount(2)
                setBody(
                    <>
                        <OneTable {...props} isInPrev={0} events={updatedEvents.slice(0, 31)} isOne={true} />
                        <OneTable {...props} isInPrev={updatedEvents.slice(0, 31).find(event => event.content === '20') ? 1 : 0} events={updatedEvents.slice(31, updatedEvents.length)} isOne={false} />
                    </>)
            }
            else {
                calTableCount(1)
                setBody(
                    <OneTable {...props} events={updatedEvents} isOne={true} />
                )
            }
        }
    }, [updatedEvents])
    return (
        < div >
            {
                body && body
            }
        </div >
    )
}

export default SetReport
