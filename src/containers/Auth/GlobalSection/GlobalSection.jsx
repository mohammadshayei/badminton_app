import { useState, useEffect } from "react"
import { getLiveGames } from "../../../api/liveGame";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import "./GlobalSection.scss"
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import Loading from "../../../components/UI/Loading/Loading";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import * as gameActions from "../../../store/actions/gameInfo"
import { HiStatusOnline } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SHUTTLE_IMAGE from "../../../assets/images/badminton_ball.png";
import { useTheme } from "../../../styles/ThemeProvider.js";

const HeaderAuth = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [gamesStats, setGamesStats] = useState(null);
    const [gamesViewers, setGamesViewers] = useState(null);
    const socket = useSelector(state => state.auth.socket)
    const [timer, setTimer] = useState(0)
    const [usersOnlineCount, setUsersOnlineCount] = useState(0);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const setSelectedGameView = (game) => {
        dispatch(gameActions.setGameView(game));
    };

    const gameClickHandler = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }

    useEffect(() => {
        let controller = new AbortController();
        (async () => {
            try {
                setLoading(true)
                const result = await getLiveGames()
                if (result.success) {
                    setGames(result.data)
                } else {
                    setDialog(null)
                    setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
                }
                setLoading(false)
                controller = null
            } catch (e) {
                // Handle fetch error
            }
        })();
        return () => controller?.abort();
    }, [])
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
        <div className='global-section-container'>
            {dialog}

            <div className="light"></div>
            <div className="global-section-inner">
                {
                    loading ?
                        <Loading /> :
                        games.length > 0 ? (
                            games.map((game, key) => (
                                <div key={game._id} className="game-box"
                                    onClick={() => gameClickHandler(game._id)}>
                                    <div className='game-box-rocket'>
                                        <div className="rocket-image">
                                            {game.game_type === "single" ? (
                                                <img src={rocket} alt="" />
                                            ) : (
                                                <img src={rockets} alt="" />
                                            )}
                                        </div>
                                        <div className="show-status">
                                            <div className="all-viewer">
                                                <AiOutlineEye style={{ fontSize: "1rem", marginRight: "0.2rem", color: theme.secondary }} />
                                                {/* <HiStatusOnline /> */}
                                                <p style={{ fontSize: "0.7rem" }}>{gamesViewers && gamesViewers[game._id] ? gamesViewers[game._id].count : 0}</p>
                                            </div>
                                            {/* <div className="online-viewer">
                                                <AiOutlineEye />
                                                <p>{gamesViewers && gamesViewers[game._id] ? gamesViewers[game._id].allCount : 0}</p>

                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="details">
                                        <p className="title">{game.tournament.title}</p>
                                        {/* <p className="game-number">{`${stringFa.game_number} ${game.game_number}`}</p> */}
                                        <div className="name-score">
                                            <div className="team">
                                                <p className="players-name">
                                                    <span>
                                                        {`${game.teamA.players[0].player.username}`}
                                                    </span>
                                                    <span>
                                                        {game.game_type === "double" && `${game.teamA.players[1].player.username}`}
                                                    </span>
                                                </p>
                                                {game.teamA.setWon === 1 && (
                                                    <img src={SHUTTLE_IMAGE} alt="" />
                                                )}
                                            </div>
                                            <div className="score-box">
                                                <p className='span-score'>
                                                    {`${gamesStats && gamesStats[game._id] ? gamesStats[game._id].teamA : game.teamA.score}    :   ${gamesStats && gamesStats[game._id] ? gamesStats[game._id].teamB : game.teamB.score}`}
                                                </p>
                                            </div>
                                            <div className="team">
                                                {game.teamB.setWon === 1 && (
                                                    <img src={SHUTTLE_IMAGE} alt="" />
                                                )}
                                                <p className="players-name">
                                                    <span>
                                                        {`${game.teamB.players[0].player.username}`}
                                                    </span>
                                                    <span>
                                                        {game.game_type === "double" && `${game.teamB.players[1].player.username}`}
                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="hint">
                                {stringFa.no_game_to_see}
                            </div>
                        )
                }
            </div>
        </div>
    )
}
// {
//     loading ?
//         <Loading /> :
//         games.length > 0 ? (
//             games.map((game, key) => (
//                 <div key={game._id} className="game-box"
//                     onClick={() => gameClickHandler(game._id)}>
//                     <div className='game-box-rocket'>
//                         {game.game_type === "single" ? (
//                             <img src={rocket} alt="" />
//                         ) : (
//                             <img src={rockets} alt="" />
//                         )}
//                         <div className="show-status">
//                             <div className="all-viewer">
//                                 <HiStatusOnline />
//                                 <p>{gamesViewers && gamesViewers[game._id] ? gamesViewers[game._id].count : 0}</p>
//                             </div>
//                             <div className="online-viewer">
//                                 <AiOutlineEye />
//                                 <p>{gamesViewers && gamesViewers[game._id] ? gamesViewers[game._id].allCount : 0}</p>

//                             </div>
//                         </div>
//                     </div>
//                     <div className="details">
//                         <p className="title">{game.tournament.title}</p>
//                         <p className="game-number">{`${stringFa.game_number} ${game.game_number}`}</p>
//                         <div className="name-score">
//                             <div className="team">
//                                 <p className="players-name">
//                                     <span> {`${game.teamA.players[0].player.username}
//                                         ${game.game_type === "double" ? "  ,  " + game.teamA.players[1].player.username : "  "}`}
//                                     </span>
//                                 </p>
//                                 {game.teamA.setWon === 1 && (
//                                     <img src={SHUTTLE_IMAGE} alt="" />
//                                 )}
//                             </div>
//                             <div className="score-box">
//                                 <p className='span-score'>
//                                     {`${gamesStats && gamesStats[game._id] ? gamesStats[game._id].teamA : game.teamA.score}    :   ${gamesStats && gamesStats[game._id] ? gamesStats[game._id].teamB : game.teamB.score}`}
//                                 </p>
//                             </div>
//                             <div className="team">
//                                 {game.teamB.setWon === 1 && (
//                                     <img src={SHUTTLE_IMAGE} alt="" />
//                                 )}
//                                 <p className="players-name">
//                                     <span> {`${game.teamB.players[0].player.username}
//                                         ${game.game_type === "double" ? "  ,  " + game.teamB.players[1].player.username : "  "}`}
//                                     </span>
//                                 </p>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))
//         ) : (
//             <div className="hint">
//                 {stringFa.no_game_to_see}
//             </div>
//         )
// }
export default HeaderAuth
