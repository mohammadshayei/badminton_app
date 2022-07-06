/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./ScoreboardView.scss"
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getGame } from "../../api/scoreboard";
import ErrorDialog from "../../components/UI/Error/ErrorDialog";
import SimpleScoreBoard from "./SimpleScoreBoard/SimpleScoreBoard";
import StadiumScoreBoard from "./StadiumScoreBoard/StadiumScoreBoard";

const ScoreboardView = () => {
    const [data, setData] = useState(null);
    const [game, setGame] = useState(null);
    const [timer, setTimer] = useState(0)
    const [setWonner, setSetWonner] = useState('')
    const [gameScores, setGameScores] = useState(null)
    const [count, setCount] = useState(1);
    const [allCount, setAllCount] = useState(1);
    const [dialog, setDialog] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedSkin, setSelectedSkin] = useState(null);

    // const game = useSelector(state => state.gameInfo.gameView)
    const socket = useSelector(state => state.auth.socket)
    // const { gymId, landNumber } = useSelector(state => state.home.assingScoreboard)
    const ip = useSelector(state => state.detail.ip)

    const location = useLocation();
    let navigate = useNavigate();


    const searchParams = new URLSearchParams(location.search);
    const gameId = searchParams.get("gameId");
    const gymId = searchParams.get("gymId");
    const landNumber = searchParams.get("landNumber");


    useEffect(() => {
        let controller = new AbortController()
        if (!gameId) return;
        (async () => {
            try {
                setLoading(true)
                const result = await getGame({ id: gameId })
                if (result.success) {
                    setGame(result.data)
                } else {
                    setDialog(null)
                    setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
                }
                setLoading(false)
                controller = null;
            } catch (e) {
            }
        })();
        return () => controller?.abort();
    }, [gameId]);

    useEffect(() => {
        if (game) {
            let updatedData = {}
            updatedData = {
                teamA: {
                    players: game.teamA.players,
                    score: game.sets.find(item => item.set.status !== 3).set.mid_game.teamA.score,
                    setWon: game.sets.filter(item => item.set.teamA.setWon).length
                }
            }
            updatedData = {
                ...updatedData,
                teamB: {
                    players: game.teamB.players,
                    score: game.sets.find(item => item.set.status !== 3).set.mid_game.teamB.score,
                    setWon: game.sets.filter(item => item.set.teamB.setWon).length
                }
            }
            setData(updatedData);
        }
    }, [game])

    useEffect(() => {
        if (socket && game && data) {
            if (timer === 0) {
                socket.on('get_change_event_set', (payload => {
                    const { scoreA, scoreB, gameId } = payload;
                    if (gameId === game._id) {
                        setTimer(200)
                        let updatedGame = { ...data }
                        updatedGame.teamA.score = scoreA
                        updatedGame.teamB.score = scoreB
                        setData(updatedGame)
                        setTimeout(() => {
                            setTimer(0)
                        }, 200)
                    }
                }))
            }

        }
    }, [socket, game, data, timer])

    useEffect(() => {
        if (socket && game) {
            socket.on('get_end_game_stats', (payload => {
                const { teamA, teamB, gameId } = payload;
                if (gameId === game._id) {
                    setGameScores({ teamA, teamB })
                }
            }))

        }
    }, [socket, game])

    useEffect(() => {
        if (socket && game) {
            socket.on('get_winner_team', (payload => {
                let { teamName, gameId } = payload;
                if (gameId === game._id) {
                    setSetWonner(teamName)
                }
            }))
            socket.on('get_exit_game', (payload => {
                let { gameId } = payload;
                if (gameId === game._id) {
                    if (gymId && landNumber) {
                        navigate(`/wait?gymId=${gymId}&landNumber=${landNumber}`)
                    } else {
                        navigate('/live_scores')
                    }
                }
            }))

        }
    }, [socket, game])

    useEffect(() => {
        if (socket && ip && gameId) {
            socket.emit('sub_game', { ip, gameId })
        }
        return () => {
            if (socket)
                socket.emit('unsub_game', { ip, gameId })
        };

    }, [gameId, socket, ip]);

    useEffect(() => {
        if (socket) {
            socket.on('send_viewer_game', (payload => {
                if (payload.gameId === gameId) {
                    setCount(payload.count)
                    if (payload.allCount) {
                        setAllCount(payload.allCount)
                    }
                }
            }))
        }
    }, [socket, gameId]);

    useEffect(() => {
        if (!setWonner) return;
        let updatedGame = { ...data }
        if (setWonner === 'team1')
            updatedGame.teamA.setWon = updatedGame.teamA.setWon + 1
        else
            updatedGame.teamB.setWon = updatedGame.teamB.setWon + 1
        updatedGame.teamA.score = 0
        updatedGame.teamB.score = 0
        setData(updatedGame)
        setSetWonner('')
        if (gymId && landNumber) {
            setTimeout(() => {
                navigate(`/wait?gymId=${gymId}&landNumber=${landNumber}`)
            }, 30000);
        }

    }, [setWonner])

    useEffect(() => {
        setSelectedSkin(
            <SimpleScoreBoard
                data={data}
                gameScores={gameScores}
            />
            // <StadiumScoreBoard
            //     data={data}
            //     gameScores={gameScores}
            //     game={game}
            //     count={count}
            //     allCount={allCount}
            // />
        )
    }, [data, gameScores, game, count, allCount]);


    return (
        <div className="scoreboard-viewers">
            {dialog}
            {selectedSkin}
        </div>
    )
}

export default ScoreboardView
