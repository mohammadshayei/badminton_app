import OneTable from './OneTable'
const SetReport = ({ events, playerTeamB, playerTeamA, teamADetail, teamBDetail }) => {
    const props = { isSingle: playerTeamA.length === 1, playerTeamB, playerTeamA, teamADetail, teamBDetail }
    return (
        < div >
            {
                events.length > 31 ?
                    <>
                        <OneTable {...props} events={events.slice(0, 31)} isOne={true} />
                        <OneTable {...props} events={events.slice(31, events.length)} isOne={false} />
                    </> :
                    <OneTable {...props} events={events} isOne={true} />
            }
        </div >
    )
}

export default SetReport
