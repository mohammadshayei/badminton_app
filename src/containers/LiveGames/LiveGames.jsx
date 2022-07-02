import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLiveGames } from '../../api/liveGame';
import { stringFa } from '../../assets/strings/stringFaCollection';
import Loading from '../../components/UI/Loading/Loading';
import rocket from "../../assets/images/rocket.png";
import rockets from "../../assets/images/rockets.png";
import SHUTTLE_IMAGE from "../../assets/images/badminton_ball.png";
import { HiStatusOnline } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'
import './LiveGames.scss'
import { useNavigate } from 'react-router-dom';
import ErrorDialog from '../../components/UI/Error/ErrorDialog';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import AssignLand from './AssignLand/AssignLand';
import LiveGameBox from '../LiveGameBox/LiveGameBox';

const LiveGames = () => {
    const [loading, setLoading] = useState(false)
    const [duration, setDuration] = useState([]);
    const [games, setGames] = useState([

    ]);
    const [gamesStats, setGamesStats] = useState(null);
    const [gamesViewers, setGamesViewers] = useState(null);
    const [timer, setTimer] = useState(0)
    const [usersOnlineCount, setUsersOnlineCount] = useState(0);
    const [dialog, setDialog] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const socket = useSelector(state => state.auth.socket)

    const navigate = useNavigate()

    const getDuration = () => {
        let newDurations = [];
        var today = new Date();
        games.forEach(game => {
            var diffInMs = Math.abs(today - new Date(game.game_time.start))
            var diffInMin = Math.trunc(diffInMs / (1000 * 60));
            newDurations = [...newDurations, `${diffInMin} '`];
        });
        setDuration(newDurations);
    }

    const gameClickHandler = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }

    // useEffect(() => {
    //     let controller = new AbortController();
    //     (async () => {
    //         try {
    //             setLoading(true)
    //             const result = await getLiveGames()
    //             if (result.success) {
    //                 setGames(result.data)
    //             } else {
    //                 setDialog(null)
    //                 setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
    //             }
    //             setLoading(false)
    //             controller = null
    //         } catch (e) {
    //             // Handle fetch error
    //         }
    //     })();
    //     return () => controller?.abort();
    // }, [])
    useEffect(() => {
        if (socket && games) {
            if (timer === 0) {
                socket.on('get_change_score_set', (payload => {
                    const { scoreA, scoreB, gameId } = payload;
                    let updatedGamesStats = { ...gamesStats }
                    if (updatedGamesStats[gameId]) {
                        updatedGamesStats[gameId].teamA = scoreA;
                        updatedGamesStats[gameId].teamB = scoreB;
                    } else {
                        updatedGamesStats = { ...updatedGamesStats, [gameId]: { teamA: scoreA, teamB: scoreB } }
                    }
                    setGamesStats(updatedGamesStats)
                    setTimeout(() => {
                        setTimer(0)
                    }, 50)
                }))
            }

        }
    }, [socket, games, timer])
    useEffect(() => {
        if (socket && games) {
            socket.on('get_winner_team', (payload => {
                let { teamName, gameId } = payload;
                let updatedGames = [...games]
                let gameIndex = updatedGames.findIndex(item => item._id === gameId)
                if (gameIndex >= 0) {
                    if (teamName === 'team1')
                        updatedGames[gameIndex].teamA.setWon =
                            updatedGames[gameIndex].teamA.setWon + 1
                    else
                        updatedGames[gameIndex].teamB.setWon =
                            updatedGames[gameIndex].teamB.setWon + 1
                    setGames(updatedGames)
                }

            }))
            socket.on('get_live_game', (payload => {
                let { game } = payload;
                let updatedGames = [...games]
                console.log('live games')
                updatedGames.push(game)
                setGames(updatedGames)
            }

            ))
            socket.on('get_exit_game', (payload => {
                let { gameId } = payload;
                let updatedGames = [...games]
                updatedGames = updatedGames.filter(game => game._id !== gameId)
                setGames(updatedGames)
            }

            ))
            socket.emit('setup_viewer_page')
            socket.on('get_viewer_page_info', (payload => {
                const { data, usersOnlineCount } = payload;
                if (!gamesViewers && games.length > 0) {
                    setUsersOnlineCount(usersOnlineCount)
                    let updatedGamesViewers = { ...gamesViewers }
                    games.forEach(game => {
                        updatedGamesViewers = {
                            ...updatedGamesViewers, [game._id]:
                            {
                                count: data && data[game._id] ? data[game._id].length : 0,
                                allCount: game.viewer
                            }
                        }

                    })
                    setGamesViewers(updatedGamesViewers)

                }
            }
            ))


        }
    }, [socket, games])
    useEffect(() => {
        if (socket) {
            socket.on('send_viewer_game', (payload => {
                let { gameId, count, allCount } = payload;
                let updatedGamesViewers = { ...gamesViewers }
                if (updatedGamesViewers && updatedGamesViewers[gameId]) {
                    if (allCount) {
                        updatedGamesViewers[gameId] = { ...updatedGamesViewers[gameId], allCount, count };
                    } else {
                        updatedGamesViewers[gameId] = { ...updatedGamesViewers[gameId], count };
                    }
                } else {
                    if (allCount) {
                        updatedGamesViewers = { ...updatedGamesViewers, [gameId]: { count, allCount } }
                    }
                    else {
                        updatedGamesViewers = { ...updatedGamesViewers, [gameId]: { count } }
                    }

                }
                setGamesViewers(updatedGamesViewers)
            }))
        }
    }, [socket, gamesViewers]);
    useEffect(() => {
        if (socket) {
            socket.on('send_sub_count', (payload => {
                let { count } = payload;
                setUsersOnlineCount(count)
            }))
        }
    }, [socket]);

    return (
        <div className="live-games-page-wrapper">
            {dialog}
            {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <AssignLand games={games} />
            </Modal>}
            <div className="live-games">
                {
                    loading ?
                        <Loading /> :
                        games.length > 0 ? (
                            games.map((game, key) => (
                                <LiveGameBox
                                    key={game._id}
                                    duration={duration[key]}
                                    game={game}
                                    gamesViewers={gamesViewers}
                                    gamesStats={gamesStats}
                                />
                            ))
                        ) : (
                            <div className="hint">
                                {stringFa.no_game_to_see}
                            </div>
                        )
                }
            </div>
            <div className='button-container'>
                <div className="online-user">
                    <p>
                        count : {usersOnlineCount}
                    </p>
                </div>
                <Button
                    onClick={() => { setShowModal(true) }}
                    ButtonStyle={{
                        fontSize: '1.2rem',
                        padding: '.4rem 1.5rem',
                        backgroundColor: 'white',
                        color: 'black',
                    }}
                >
                    {stringFa.assign_scorebaord_to_court}
                </Button>
            </div>
        </div>
    )
}

export default LiveGames
