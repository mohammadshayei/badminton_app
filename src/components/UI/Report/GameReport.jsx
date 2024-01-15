/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from 'react-router-dom';
import './Report.scss'
import "./ReportPage.css"
import Button from "../../../components/UI/Button/Button"
import { useEffect, useRef, useState } from 'react';
import { stringFa } from '../../../assets/strings/stringFaCollection';
import { getGame } from '../../../api/home';
import { useSelector } from 'react-redux';
import PlayerBox from './PlayerBox';
import SetReport from './SetReport';
import OneTable from './OneTable';
import TransparentButton from '../Button/TransparentButton/TransparentButton';
import { useReactToPrint } from 'react-to-print';

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
    const pageRef = useRef(null);

    useEffect(() => {
        if (!id || !token) return;
        (async () => {
            const result = await getGame(id, token)
            if (result.success) {
                setGame(result.data)
            } else {
                alert(result.error)
            }
        })()
    }, [id, token])

    const print = () => {
        doPrint();
    }

    const onBack = () => {
        navigate(-1)
    }

    const calTableCount = (n) => {
        setTableCount(e => e + n)
    }

    const doPrint = useReactToPrint({
        pageStyle: `@media print {
            @page {
              size: 297mm 210mm !important;
              margin: 0 !important;

            }
          }`,
        content: () => pageRef.current,
    });

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === "p") {
            e.preventDefault();
            print();
        }
    };

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

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className='game-report-wrapper'>
            <div className="actions-box">
                <TransparentButton
                    onClick={onBack}
                >
                    {stringFa.back}
                </TransparentButton>
                <Button
                    onClick={print}
                >
                    {stringFa.print}
                </Button>
            </div>
            {game &&
                <div ref={pageRef} id="GamePrint" className="game-report" >
                    <div className="header-report">
                        <div className="diagram-title">
                            <span>
                                DIAGRAM {game.game_number}
                            </span>
                        </div>
                        <div className="header-content">
                            <div className="left-header">
                                <span >Event : {game.tournament.title}</span>
                                <span>No.R16 - # 19 </span>
                                <span>Date : {date}&nbsp;&nbsp;&nbsp;Time : {time} </span>
                            </div>
                            <div className="middle-header">
                                <PlayerBox
                                    positionTeam={game.sets[0].set.teamA.isRightTeam ? 'R' : "L"}
                                    isLeftSide={true}
                                    players={game.teamA.players.map(item => item.player.username)}
                                    setWon={gameWon === 'team1' ? true : false}
                                />
                                <div className='score-box'>
                                    <span>score</span>
                                    {
                                        [...Array(3)].map((item, index) => {
                                            return (game.sets[index] ?
                                                <div key={game.sets[index].set._id} className='scores-of-set'>
                                                    <span>{game.sets[index].set.teamA.score}</span> : <span>{game.sets[index].set.teamB.score}</span>
                                                </div>
                                                :
                                                <span key={index} className='scores-of-set'>
                                                    :
                                                </span>)
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
                                    <span>Shuttles : {game.shuttls}</span>
                                </div>
                            </div>
                            <div className="right-header">
                                <span>
                                    Court : {game.land_number}
                                </span>
                                <span>
                                    Umpire :
                                    {/* {game.referee.username} */}
                                </span>
                                <span>
                                    Service Judge :
                                    {/* {game.service_referee ? game.service_referee.username : stringFa.undefined} */}
                                </span>
                                <span>
                                    Start match : {matchTime.start}
                                </span>
                                <span>
                                    End match : {matchTime.end}
                                </span>
                                <span>
                                    Duration(Min) : {matchTime.duration}
                                </span>

                            </div>
                        </div>
                        <div className='tables-report'>
                            {game?.sets.map(item =>
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
                            <span>
                                Umpire's Signature..........................................
                            </span>
                            <span>
                                Referee's Signature..........................................
                            </span>
                            <span>
                                Results Service..........................................
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GameReport
