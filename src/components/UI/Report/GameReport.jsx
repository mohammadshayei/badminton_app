import { useLocation, useNavigate } from 'react-router-dom';
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
import OneTable from './OneTable';
import TransparentButton from '../Button/TransparentButton/TransparentButton';

const GameReport = () => {
    const [game, setGame] = useState(null)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [gameWon, setGameWon] = useState('')
    const [tableCount, setTableCount] = useState(0)
    const [matchTime, setMatchTime] = useState({ start: "", end: "", duration: "" })

    const token = useSelector(state => state.auth.token)
    const locaiton = useLocation();
    const searchParams = new URLSearchParams(locaiton.search);
    const id = searchParams.get("id");
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) return;
        (async () => {
            const result = await getGame(id, token)
            if (result.success) {
                setGame(result.data)
            } else {
                alert(result.error)
            }
        })()
    }, [id])
    const download = () => {
        const input = document.getElementById('GamePrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'mm', [297, 210]);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save(`${game.tournament.title}_${game.game_number}.pdf`);
            })
            ;
    }
    const onBack = () => {
        navigate(-1)
    }
    useEffect(() => {
        if (game) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let date = new Date(game.date);
            let month = months[date.getMonth()];
            setDate(`${date.getDate()} ${month} ${date.getFullYear()} `)
            setTime(`${date.getHours().toString().padStart(2, '0')} : ${date.getMinutes().toString().padStart(2, '0')}`)
            let durationMathTime =
                new Date(game.game_time.end).getTime() - new Date(game.game_time.start).getTime()
            setMatchTime({
                start: `${new Date(game.game_time.start).getHours().toString().padStart(2, '0')} : ${new Date(game.game_time.start).getMinutes().toString().padStart(2, '0')}`,
                end: `${new Date(game.game_time.end).getHours().toString().padStart(2, '0')} : ${new Date(game.game_time.end).getMinutes().toString().padStart(2, '0')}`,
                duration: `${Math.floor(durationMathTime / (1000 * 60))}`,
            })

            game.sets.forEach(item => {
                item.set.events.forEach(event => {
                    if (event.content === 'Dis' || event.content === 'Ret') {
                        let playerTeamA = game.teamA.players.find(item => item.player._id === event.by) ? true : false;
                        setGameWon(playerTeamA ? 'team2' : "team1")
                    }
                })
            })
            if (game.teamA.setWon === 2) setGameWon('team1')
            else if (game.teamB.setWon === 2) setGameWon('team2')
        }
    }, [game])
    const calTableCount = (n) => {
        setTableCount(e => e + n)
    }
    return (
        <div className='game-report-wrapper'>
            <div className="actions-box">
                <TransparentButton
                    onClick={onBack}
                >
                    {stringFa.back}
                </TransparentButton>
                <Button
                    onClick={download}
                    ButtonStyle={{
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
                                <PlayerBox
                                    positionTeam={game.sets[0].set.teamA.isRightTeam ? 'R' : "L"}
                                    isLeftSide={true}
                                    players={game.teamA.players.map(item => item.player.username)}
                                    setWon={gameWon === 'team1' ? true : false}
                                />
                                <div className='score-box'>
                                    <p>score</p>
                                    {
                                        [...Array(3)].map((item, index) => {
                                            return (game.sets[index] ?
                                                <p key={game.sets[index].set._id} className='scores-of-set'>
                                                    <p>{game.sets[index].set.teamA.score}</p> : <p>{game.sets[index].set.teamB.score}</p>
                                                </p>
                                                :
                                                <p key={index} className='scores-of-set'>
                                                    :
                                                </p>)
                                        })
                                    }
                                </div>
                                <PlayerBox
                                    positionTeam={game.sets[0].set.teamB.isRightTeam ? "R" : "L"}
                                    players={game.teamB.players.map(item => item.player.username)}
                                    isLeftSide={false}
                                    setWon={gameWon === 'team2' ? true : false}
                                />
                                <div className='shuttl'>
                                    <p>Shuttls : {game.shuttls}</p>
                                </div>
                            </div>
                            <div className="right-header">
                                <p>
                                    Court : {game.land_number}
                                </p>
                                <p>
                                    Umpire : {game.referee.username}
                                </p>
                                <p>
                                    Service Judge : {game.service_referee ? game.service_referee.username : stringFa.undefined}
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
                                    calTableCount={calTableCount}
                                    playerTeamB={game.teamB.players}
                                    playerTeamA={game.teamA.players}
                                    events={item.set.events}
                                    teamADetail={{
                                        server: item.set.teamA.server,
                                        receiver: item.set.teamA.receiver,
                                        setWon: item.set.teamA.setWon,
                                        score: item.set.teamA.score
                                    }}
                                    teamBDetail={{
                                        server: item.set.teamB.server,
                                        receiver: item.set.teamB.receiver,
                                        setWon: item.set.teamB.setWon,
                                        score: item.set.teamB.score
                                    }}
                                    empty={false}
                                />)
                            }

                            {
                                [...Array(6 - tableCount)].map((e, i) =>
                                    <OneTable
                                        key={`${i}item.set._id`}
                                        isSingle={game.teamA.players.length === 1}
                                        playerTeamB={game.teamB.players}
                                        playerTeamA={game.teamA.players}
                                        events={[]}
                                        empty={true}
                                    />
                                )
                            }
                        </div>
                        <div className='signature'>
                            <p>
                                Umpire's Signature..........................................
                            </p>
                            <p>
                                Referee's Signature..........................................
                            </p>
                            <p>
                                Results Service..........................................
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GameReport
