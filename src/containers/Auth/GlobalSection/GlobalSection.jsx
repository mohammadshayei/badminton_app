import { useState, useEffect } from "react"
import { getLiveGames } from "../../../api/liveGame";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import "./GlobalSection.scss"
import Loading from "../../../components/UI/Loading/Loading";
import { useSelector } from "react-redux";
import { useTheme } from "../../../styles/ThemeProvider.js";
import LiveGameBox from "../../LiveGameBox/LiveGameBox";
import { stringFa } from "../../../assets/strings/stringFaCollection";

const HeaderAuth = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false)
    const [gamesFetched, setGamesFetched] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [gamesScores, setGamesScores] = useState([])
    const [endGamesScores, setEndGamesScores] = useState([])
    const [gamesStats, setGamesStats] = useState(null);
    const [gamesViewers, setGamesViewers] = useState(null);
    const [duration, setDuration] = useState([]);
    const socket = useSelector(state => state.auth.socket)
    const [timer, setTimer] = useState(0)
    const [usersOnlineCount, setUsersOnlineCount] = useState(0);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

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

    useEffect(() => {
        let controller = new AbortController();
        (async () => {
            try {
                setLoading(true)
                const result = await getLiveGames()
                if (result.success) {
                    setGames(result.data)
                    setGamesFetched(true)

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
                socket.on('get_change_event_set', (payload => {
                    const { scoreA, scoreB, serverA, serverB, gameId } = payload;
                    setTimer(100)
                    let updatedGamesStats = { ...gamesStats }
                    if (updatedGamesStats[gameId]) {
                        updatedGamesStats[gameId].teamA = { score: scoreA, server: serverA };
                        updatedGamesStats[gameId].teamB = { score: scoreB, server: serverB };
                    } else {
                        updatedGamesStats = {
                            ...updatedGamesStats, [gameId]: {
                                teamA: { score: scoreA, server: serverA }
                                , teamB: { score: scoreB, server: serverB },
                            }
                        }
                    }
                    setGamesStats(updatedGamesStats)
                    setTimeout(() => {
                        setTimer(0)
                    }, 100)
                }))
            }

        }

    }, [socket, games, timer])

    useEffect(() => {
        if (socket && games) {
            socket.on('get_live_game', (payload => {
                let { game } = payload;
                let updatedGames = [...games]
                if (updatedGames.findIndex(item => item._id === game._id) < 0)
                    updatedGames.push(game)
                setGames(updatedGames)
            }

            ))
            socket.on('get_exit_game', (payload => {
                let { gameId } = payload;
                let updatedGames = [...games]
                updatedGames = updatedGames.filter(game => game._id !== gameId)
                setGames(updatedGames)
                let updatedGamesScores = gamesScores.filter(item => item.gameId !== gameId)
                setGamesScores(updatedGamesScores)
                let updatedEndGamesScores = endGamesScores.filter(item => item.gameId !== gameId)
                setEndGamesScores(updatedEndGamesScores)
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

    useEffect(() => {
        if (!games) return;
        const interval = setInterval(() => {
            getDuration();
        }, 50000);

        return () => {
            clearInterval(interval);
        };
    }, [games]);

    useEffect(() => {
        if (!socket || !gamesFetched) return;
        socket.on('get_winner_team', (payload => {
            let { scores, gameId } = payload;
            let updatedGamesScores = [...gamesScores]
            let index = updatedGamesScores.findIndex(item => item.gameId === gameId)
            if (index > -1) {
                updatedGamesScores[index] = {
                    scores,
                    gameId,
                }
            }
            else {
                updatedGamesScores.push({
                    gameId,
                    scores
                })
            }
            setGamesScores(updatedGamesScores)


        }))

    }, [gamesFetched, socket, gamesScores])
    useEffect(() => {
        if (!socket || !gamesFetched) return;
        socket.on('get_end_game_stats', (payload => {
            let { gameId, teamA, teamB } = payload;
            let updatedData = [...endGamesScores]
            let index = updatedData.findIndex(item => item.gameId === gameId)
            if (index > -1) {
                updatedData[index] = {
                    scores: { a: teamA, b: teamB },
                    gameId,
                }
            }
            else {
                updatedData.push({
                    gameId,
                    scores: { a: teamA, b: teamB },
                })
            }
            setEndGamesScores(updatedData)
            setTimeout(() => {
                let updatedGames = [...games]
                updatedGames = updatedGames.filter(game => game._id !== gameId)
                setGames(updatedGames)
                let updatedGamesScores = gamesScores.filter(item => item.gameId !== gameId)
                setGamesScores(updatedGamesScores)
                let updatedEndGamesScores = endGamesScores.filter(item => item.gameId !== gameId)
                setEndGamesScores(updatedEndGamesScores)
            }, 5000);

        }))
    }, [endGamesScores, socket, gamesFetched])
    return (
        <div className='global-section-container'
            style={{
                display: games.length > 0 ? "flex" : "none",
                backgroundColor: theme.surface,
                color: theme.on_surface
            }}
        >
            <div className="live-scores-title"
                style={{ color: theme.primary }}
            >
                {stringFa.live_scores}
            </div>
            {dialog}
            {loading ?
                <Loading style={{ color: theme.on_surface }} /> :
                games.length > 0 && (
                    games.map((game, key) => (
                        <LiveGameBox
                            key={game._id}
                            duration={duration[key]}
                            game={game}
                            gamesViewers={gamesViewers}
                            gamesStats={gamesStats}
                            gamesScores={gamesScores}
                            endGamesScores={endGamesScores}
                        />
                    ))
                )
            }
        </div>
    )
}
export default HeaderAuth