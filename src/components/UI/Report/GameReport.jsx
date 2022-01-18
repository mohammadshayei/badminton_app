import { useLocation } from 'react-router-dom';
import './Report.scss'
import Button from "../../../components/UI/Button/Button"
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import { stringFa } from '../../../assets/strings/stringFaCollection';
import { getGame } from '../../../api/home';
import { useSelector } from 'react-redux';
import PlayerBox from './PlayerBox';
import SetReport from './SetReport';

const GameReport = () => {
    const [game, setGame] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [matchTime, setMatchTime] = useState({ start: "", end: "", duration: "" })

    const token = useSelector(state => state.auth.token)
    const locaiton = useLocation();
    const searchParams = new URLSearchParams(locaiton.search);
    const id = searchParams.get("id");
    useEffect(async () => {
        if (id !== '') {
            const result = await getGame(id, token)
            if (result.success) {
                setGame(result.data)
            } else {
                alert(result.error)
            }
        }
    }, [id])
    const download = () => {
        const input = document.getElementById('GamePrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'mm', [297, 210]);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`game.pdf`);
            })
            ;
    }
    useEffect(() => {
        if (game) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date(game.date);
            let month = months[date.getMonth()];
            setDate(`${date.getDate()} ${month} ${date.getFullYear()} `)
            setTime(`${date.getHours()} : ${date.getMinutes()}`)
            let durationMathTime =
                new Date(game.game_time.end).getTime() - new Date(game.game_time.start).getTime()
            setMatchTime({
                start: `${new Date(game.game_time.start).getHours()} : ${new Date(game.game_time.start).getMinutes()}`,
                end: `${new Date(game.game_time.end).getHours()} : ${new Date(game.game_time.end).getMinutes()}`,
                duration: `${Math.floor(durationMathTime / (1000 * 60))}`,
            })
        }
    }, [game])
    // if(game)console.log(game.sets)
    return (
        <div className='game-report-wrapper'>
            <div className="actions-box">
                <Button
                    onClick={download}
                    ButtonStyle={{
                        fontSize: '1.2rem',
                        padding: '.4rem 4rem',
                        background: 'white',
                        color: 'black',
                    }}
                >
                    {stringFa.download}
                </Button>
            </div>
            {game &&
                <div id="GamePrint" className="game-report" >
                    <div className="header-report">
                        <div className="diagram-title">
                            <p>
                                DIAGRAM {game.game_number}
                            </p>
                        </div>
                        <div className="header-content">
                            <div className="left-header">
                                <p >Event : {game.tournament.title}</p>
                                <p>No.R16 - # 19 </p>
                                <p>Date : {date}&nbsp;&nbsp;&nbsp;Time : {time} </p>
                            </div>
                            <div className="middle-header">
                                <PlayerBox players={game.teamA.players.map(item => item.player.username)} />
                                <div className='socre-box'>
                                    <p>score</p>
                                    {
                                        game.sets.map(
                                            item =>
                                                <p key={item.set._id}>{item.set.teamA.score} : {item.set.teamB.score}</p>
                                        )
                                    }
                                </div>
                                <PlayerBox players={game.teamB.players.map(item => item.player.username)} />

                            </div>
                            <div className="right-header">
                                <p>
                                    Count : 3
                                </p>
                                <p>
                                    Umpire : {game.referee.username}
                                </p>
                                <p>
                                    Service Judge : {game.service_referee.username}
                                </p>
                                <p>
                                    Start match : {matchTime.start}
                                </p>
                                <p>
                                    End match : {matchTime.end}
                                </p>
                                <p>
                                    Duration(Min) : {matchTime.duration}
                                </p>

                            </div>
                        </div>
                        <div className='tables-report'>
                            {game.sets.map(item =>
                                <SetReport
                                    key={item.set._id}
                                    playerTeamB={game.teamB.players}
                                    playerTeamA={game.teamA.players}
                                    events={item.set.events}
                                    teamADetail={{
                                        server: item.set.teamA.server,
                                        receiver: item.set.teamA.receiver,
                                    }}
                                    teamBDetail={{
                                        server: item.set.teamB.server,
                                        receiver: item.set.teamB.receiver,
                                    }}
                                />)}


                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GameReport
